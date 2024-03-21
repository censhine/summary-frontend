<script>
// Vue组件中的JavaScript代码
import { createApp } from 'vue';
const app = createApp({});
// app.config.globalProperties.$proxyServer = require('./path/to/cpp-dll'); // 导入C++ DLL文件
 
export default {
  methods: {
    async fetchData() {
      try {
        const result = await this.$proxyServer.fetchData(); // 调用C++函数
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
