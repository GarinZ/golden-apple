<style lang="less" scoped>
@import "~@assets/css/styles/custom.less";

  .account-info-container {
    width: 392px;
    text-align: center;

    .user-name-container {
      margin-top: 39px;
      margin-bottom: 76px;
      .user-name {
        position: relative;
        &-text {
          display: inline-block;
          font-size: 18px;
        }
        &-edit-button {
          color: #262A3F;
          position: absolute;
          top: 4px;
          cursor: pointer;
        }
      }
    }
    .user-avatar {
      width: 126px;
      height: 126px;
      border-radius: 63px;
      background-size: cover;
      margin: 0 auto;
    }
  }
  .account-info-bind {
    padding-top: 30px;
    border-top: 1px solid #E7E7E7;
    &.wechat {
      margin-bottom: 10px;
    }
  }
  .modal-footer {
    margin-top: 48px;
    .button-group {
      margin-top: 35px;
      .confirm-button {
        margin-right: 14px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .account-info-container {
      width: 260px;
    }
  }
</style>

<template>
  <div class="account-info-container">
    <div class="user-avatar" v-bind:style="{backgroundImage: `url(${avatarUrl})`}" @click="this.onAvatarClick"></div>
    <div class="user-name-container">
      <div class="user-name">
        <div class="user-name-text">{{ userName }}</div>
        <img class="user-name-edit-button" @click="onEditUserNameButtonClick" :src="editIcon">
      </div>
    </div>
    <account-bind class="account-info-bind wechat" :bind-type="'WECHAT'"
                  :is-bind="isWechatBind" :on-bind-click="onWechatBindClick" :on-unbind-click="onWechatUnbindClick" />
    <account-bind class="account-info-bind email" :bind-type="'EMAIL'" :is-bind="isEmailBind"
                  :on-bind-click="onEmailBindClick" :on-unbind-click="onEmailUnbindClick"/>
    <Modal v-model="isUploadShow" :loading="true" :footer-hide="true">
      <single-image-uploader :image-url="imageUrl" :on-upload="getBase64" />
      <div class="modal-footer clear">
        <div class="button-group fr">
          <Button
            class="fr cancel-button" @click="onUploadCancel">取消</Button>
          <Button
            type="primary"
            class="confirm-button fr"
            @click="onUploadConfirm"
            :loading="isUploadConfirmLoading"
            :disabled="this.base64 === ''"
          >确定</Button>
        </div>
      </div>
    </Modal>
    <Modal v-model="isUserNameEditShow" :loading="true" :footer-hide="true">
      <user-name-edit :user-name="editingUserName" :on-change="onEditingUserNameChange" />
      <div class="modal-footer clear">
        <div class="button-group fr">
          <Button
            class="fr cancel-button" @click="onUserNameCancel">取消</Button>
          <Button
            type="primary"
            class="confirm-button fr"
            @click="onUserNameConfirm"
            :loading="isUserNameEditConfirmLoading"
            :disabled="editingUserName === ''"
          >确定</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SingleImageUploader from '@/component/SingleImageUploader';
import UserNameEdit from '@/component/UserNameEdit';
import AccountBind from '@/component/AccountBind';
import editIcon from '@assets/images/icons/edit.svg';
import { validateUserName } from '@/common/utils/ValidateUtils';
import RouterName from '@/common/constants/RouterName';

export default {
  name: 'account-info',
  components: {
    SingleImageUploader,
    UserNameEdit,
    AccountBind,
  },
  data() {
    return {
      imageUrl: this.avatarUrl,
      isUploadShow: false,
      isUploadConfirmLoading: false,
      base64: '',
      editIcon,
      isUserNameEditShow: false,
      editingUserName: this.userName,
      isUserNameEditConfirmLoading: false,
    };
  },
  computed: {
    ...mapState('userProfile', ['userId', 'userName', 'avatarUrl', 'isEmailBind', 'isWechatBind']),
  },
  methods: {
    ...mapActions('userProfile', ['getUserProfile', 'updateUserName', 'updateAvatarUrl', 'uploadAvatar', 'unbindWechat']),
    ...mapActions('emailBind', ['unbindEmail']),
    getBase64(base64) {
      this.base64 = base64;
      this.imageUrl = base64;
    },
    async onUploadConfirm() {
      const self = this;
      this.isUploadConfirmLoading = true;
      try {
        await this.uploadAvatar(this.base64);
        self.$Message.success('上传成功');
        self.isUploadShow = false;
        self.isConfirmLoading = false;
      } catch (e) {
        self.$Message.error('上传失败');
        self.isConfirmLoading = false;
        self.imageUrl = self.avatarUrl;
      }
    },
    onUploadCancel() {
      this.isUploadShow = false;
    },
    onAvatarClick() {
      this.imageUrl = this.avatarUrl;
      this.isUploadShow = true;
    },
    onEditUserNameButtonClick() {
      this.editingUserName = this.userName;
      this.isUserNameEditShow = true;
    },
    onEditingUserNameChange(e) {
      this.editingUserName = e.target.value;
    },
    async onUserNameConfirm() {
      const errorMsg = validateUserName(this.editingUserName);
      if (errorMsg) {
        this.$Message.error(errorMsg);
        return;
      }
      this.isUserNameEditConfirmLoading = true;
      try {
        await this.updateUserName(this.editingUserName);
        this.$Message.success('昵称修改成功');
        this.isUserNameEditConfirmLoading = false;
        this.isUserNameEditShow = false;
      } catch (e) {
        this.isUserNameEditConfirmLoading = false;
      }
    },
    onUserNameCancel() {
      this.isUserNameEditShow = false;
    },
    onWechatBindClick() {
      // 调起绑定窗口
      const wechatBindWindow = window.open('/venus/account/bind/wechat', '_blank', `
        width=400,
        height=600
      `);
      // 在父Window上注册绑定成功回调事件
      const self = this;
      window.addEventListener('message', () => {
        self.getUserProfile();
        wechatBindWindow.close();
      }, false);
    },
    async onWechatUnbindClick() {
      await this.unbindWechat();
      await this.getUserProfile();
    },
    onEmailBindClick() {
      this.$router.push({ name: RouterName.BIND_EMAIL });
    },
    async onEmailUnbindClick() {
      await this.unbindEmail();
      this.$Message.success('解绑成功');
      await this.getUserProfile();
    },
  },
};
</script>
