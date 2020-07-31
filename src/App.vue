<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@font-face {
  font: {
    family: 'Lucida Sans Unicode';
    weight: normal;
    style: normal;
    display: swap;
  }
  src: local('Lucida Sans Unicode'),
       url('./assets/fonts/Lucida-Sans-Unicode.woff2') format('woff2'),
       url('./assets/fonts/Lucida-Sans-Unicode.woff') format('woff');
}

@font-face {
  font: {
    family: 'Icons';
    weight: normal;
    style: normal;
  }
  src: url('./assets/fonts/Icons.woff2') format('woff2'),
       url('./assets/fonts/Icons.woff') format('woff');
}
   
[class^='icon-']:before, [class*=' icon-']:before {
  display: inline-block;
  font: {
    family: 'Icons';
    style: normal;
    weight: normal;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-times-circle:before { content: '\e800'; }
.icon-check:before { content: '\e801'; }
.icon-exclamation-circle:before { content: '\e802'; }
.icon-refresh:before { content: '\e803'; }
.icon-chevron-up:before { content: '\e804'; }
.icon-chevron-down:before { content: '\e805'; }
.icon-filter:before { content: '\f0b0'; }
.icon-chevron-circle-up:before { content: '\f139'; }
.icon-chevron-circle-down:before { content: '\f13a'; }

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f0f0f0;
}

*::-webkit-scrollbar-thumb {
  background-color: #cdcdcd;
}

#app {
  font-family: sans-serif;
}
</style>
