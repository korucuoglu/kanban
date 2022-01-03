<template>
  <div class="item">
    <p class="title">Selam</p>
    <p class="content">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo cupiditate
      voluptas quis. Recusandae, corporis quia?
    </p>
  </div>
</template>

<style scoped lang="scss">
.item {
  background-color: blueviolet;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
    line-height: 1.5;
  }
  .content {
    line-height: 1.4;
    font-size: 14px;
    opacity: 0.7;
  }
}
</style>