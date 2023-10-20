<template>
  <!-- 参考： https://v5.getbootstrap.com/docs/5.0/components/navs/ -->
  <div class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand" href="#">者也专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <DropDownMenu :title='`你好 ${user.name}`'>
        <DropDownMenuItem>
          <router-link to="/create" class="dropdown-item">新建文章</router-link>
        </DropDownMenuItem>
        <DropDownMenuItem>
          <router-link to="/column/1" class="dropdown-item">我的专栏</router-link>
        </DropDownMenuItem>
        <DropDownMenuItem disabled><a href="#" class="dropdown-item">编辑资料</a></DropDownMenuItem>
        <DropDownMenuItem><a href="#" class="dropdown-item">退出登陆</a></DropDownMenuItem>
      </DropDownMenu>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDownMenu from './DropDownMenu.vue'
import DropDownMenuItem from './DropDownMenuItem.vue'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropDownMenu,
    DropDownMenuItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
