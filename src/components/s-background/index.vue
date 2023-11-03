<template>
  <div class="index">
    <div class="background">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="background-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'index'
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes animate {
  0%{
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100%{
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
.index{
  width: 100%;
  height: 100%;
  position: relative;
  .background-box{
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index:2
  }
  @keyframes move {
    100% {
      transform: translate3d(0, 0, 1px) rotate(360deg);
    }
  }

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff5e4;
    overflow: hidden;
  }

  .background span {
    width: 4vmin;
    height: 4vmin;
    border-radius: 4vmin;
    backface-visibility: hidden;
    position: absolute;
    animation: move;
    animation-duration: 45;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .background span:nth-child(0) {
    color: #E45A84;
    top: 22%;
    left: 36%;
    animation-duration: 39s;
    animation-delay: -27s;
    transform-origin: 20vw 10vh;
    box-shadow: 8vmin 0 1.3680508179993163vmin currentColor;
  }
  .background span:nth-child(1) {
    color: #E45A84;
    top: 4%;
    left: 95%;
    animation-duration: 12s;
    animation-delay: -12s;
    transform-origin: 4vw 3vh;
    box-shadow: -8vmin 0 1.3942907422213813vmin currentColor;
  }
  .background span:nth-child(2) {
    color: #fad434;
    top: 18%;
    left: 87%;
    animation-duration: 30s;
    animation-delay: -16s;
    transform-origin: 16vw -5vh;
    box-shadow: -8vmin 0 1.2455543933180908vmin currentColor;
  }
  .background span:nth-child(3) {
    color: #fad434;
    top: 1%;
    left: 70%;
    animation-duration: 42s;
    animation-delay: -29s;
    transform-origin: 7vw 8vh;
    box-shadow: -8vmin 0 1.4550738704471442vmin currentColor;
  }
  .background span:nth-child(4) {
    color: #fad434;
    top: 13%;
    left: 60%;
    animation-duration: 20s;
    animation-delay: -2s;
    transform-origin: -3vw -20vh;
    box-shadow: 8vmin 0 1.5456804030834932vmin currentColor;
  }
  .background span:nth-child(5) {
    color: #E45A84;
    top: 38%;
    left: 59%;
    animation-duration: 35s;
    animation-delay: -42s;
    transform-origin: 24vw -13vh;
    box-shadow: -8vmin 0 1.640584753648893vmin currentColor;
  }
  .background span:nth-child(6) {
    color: #E45A84;
    top: 93%;
    left: 91%;
    animation-duration: 24s;
    animation-delay: -32s;
    transform-origin: -23vw 9vh;
    box-shadow: -8vmin 0 1.991619152639375vmin currentColor;
  }
  .background span:nth-child(7) {
    color: #E45A84;
    top: 75%;
    left: 89%;
    animation-duration: 19s;
    animation-delay: -30s;
    transform-origin: -8vw -18vh;
    box-shadow: -8vmin 0 1.505620475232183vmin currentColor;
  }
  .background span:nth-child(8) {
    color: #E45A84;
    top: 54%;
    left: 28%;
    animation-duration: 54s;
    animation-delay: -4s;
    transform-origin: 11vw -14vh;
    box-shadow: -8vmin 0 1.1367342037645192vmin currentColor;
  }
  .background span:nth-child(9) {
    color: #fad434;
    top: 83%;
    left: 34%;
    animation-duration: 41s;
    animation-delay: -33s;
    transform-origin: -4vw -1vh;
    box-shadow: -8vmin 0 1.378377252095716vmin currentColor;
  }
  .background span:nth-child(10) {
    color: #FFACAC;
    top: 10%;
    left: 2%;
    animation-duration: 46s;
    animation-delay: -25s;
    transform-origin: -22vw 3vh;
    box-shadow: 8vmin 0 1.088768791274781vmin currentColor;
  }
  .background span:nth-child(11) {
    color: #E45A84;
    top: 71%;
    left: 79%;
    animation-duration: 23s;
    animation-delay: -32s;
    transform-origin: 4vw 20vh;
    box-shadow: 8vmin 0 1.5147534549714756vmin currentColor;
  }
  .background span:nth-child(12) {
    color: #FFACAC;
    top: 25%;
    left: 17%;
    animation-duration: 29s;
    animation-delay: -35s;
    transform-origin: 19vw -2vh;
    box-shadow: -8vmin 0 1.8142903436010869vmin currentColor;
  }
  .background span:nth-child(13) {
    color: #fad434;
    top: 80%;
    left: 45%;
    animation-duration: 16s;
    animation-delay: -47s;
    transform-origin: 25vw 1vh;
    box-shadow: -8vmin 0 1.235652120783556vmin currentColor;
  }
  .background span:nth-child(14) {
    color: #fad434;
    top: 13%;
    left: 54%;
    animation-duration: 17s;
    animation-delay: -22s;
    transform-origin: -11vw -5vh;
    box-shadow: 8vmin 0 1.226767433913846vmin currentColor;
  }
  .background span:nth-child(15) {
    color: #fad434;
    top: 51%;
    left: 29%;
    animation-duration: 12s;
    animation-delay: -7s;
    transform-origin: 24vw 4vh;
    box-shadow: -8vmin 0 1.459490193125502vmin currentColor;
  }
  .background span:nth-child(16) {
    color: #FFACAC;
    top: 69%;
    left: 37%;
    animation-duration: 55s;
    animation-delay: -11s;
    transform-origin: 4vw 2vh;
    box-shadow: 8vmin 0 1.5917212382798787vmin currentColor;
  }
  .background span:nth-child(17) {
    color: #fad434;
    top: 78%;
    left: 58%;
    animation-duration: 29s;
    animation-delay: -15s;
    transform-origin: 4vw 23vh;
    box-shadow: -8vmin 0 1.0444064647427789vmin currentColor;
  }
  .background span:nth-child(18) {
    color: #FFACAC;
    top: 7%;
    left: 23%;
    animation-duration: 41s;
    animation-delay: -30s;
    transform-origin: -5vw 2vh;
    box-shadow: 8vmin 0 1.825546171478226vmin currentColor;
  }
  .background span:nth-child(19) {
    color: #E45A84;
    top: 35%;
    left: 9%;
    animation-duration: 15s;
    animation-delay: -10s;
    transform-origin: 9vw 4vh;
    box-shadow: 8vmin 0 1.7016391214982294vmin currentColor;
  }
  .background span:nth-child(20) {
    color: #FFACAC;
    top: 11%;
    left: 64%;
    animation-duration: 27s;
    animation-delay: -19s;
    transform-origin: -19vw -5vh;
    box-shadow: -8vmin 0 1.3433914372867946vmin currentColor;
  }
  .background span:nth-child(21) {
    color: #fad434;
    top: 71%;
    left: 39%;
    animation-duration: 26s;
    animation-delay: -33s;
    transform-origin: -22vw -21vh;
    box-shadow: -8vmin 0 1.1358049184058754vmin currentColor;
  }
  .background span:nth-child(22) {
    color: #FFACAC;
    top: 29%;
    left: 31%;
    animation-duration: 29s;
    animation-delay: -10s;
    transform-origin: -23vw -7vh;
    box-shadow: 8vmin 0 1.8503807218901964vmin currentColor;
  }
  .background span:nth-child(23) {
    color: #fad434;
    top: 83%;
    left: 77%;
    animation-duration: 23s;
    animation-delay: -25s;
    transform-origin: -22vw -17vh;
    box-shadow: -8vmin 0 1.1703681967521924vmin currentColor;
  }
  .background span:nth-child(24) {
    color: #fad434;
    top: 94%;
    left: 32%;
    animation-duration: 40s;
    animation-delay: -16s;
    transform-origin: -24vw -21vh;
    box-shadow: -8vmin 0 1.007081395702849vmin currentColor;
  }
  .background span:nth-child(25) {
    color: #fad434;
    top: 36%;
    left: 40%;
    animation-duration: 54s;
    animation-delay: -31s;
    transform-origin: 6vw 10vh;
    box-shadow: -8vmin 0 1.3991909389817592vmin currentColor;
  }
  .background span:nth-child(26) {
    color: #FFACAC;
    top: 9%;
    left: 83%;
    animation-duration: 45s;
    animation-delay: -49s;
    transform-origin: -16vw 2vh;
    box-shadow: 8vmin 0 1.6047785565531132vmin currentColor;
  }
  .background span:nth-child(27) {
    color: #E45A84;
    top: 64%;
    left: 98%;
    animation-duration: 21s;
    animation-delay: -4s;
    transform-origin: 22vw -19vh;
    box-shadow: 8vmin 0 1.5456433862498022vmin currentColor;
  }
  .background span:nth-child(28) {
    color: #fad434;
    top: 69%;
    left: 71%;
    animation-duration: 52s;
    animation-delay: -32s;
    transform-origin: 7vw 12vh;
    box-shadow: -8vmin 0 1.0451436130168617vmin currentColor;
  }
  .background span:nth-child(29) {
    color: #fad434;
    top: 59%;
    left: 38%;
    animation-duration: 34s;
    animation-delay: -14s;
    transform-origin: 25vw 2vh;
    box-shadow: -8vmin 0 1.6090247493113812vmin currentColor;
  }
  .background span:nth-child(30) {
    color: #FFACAC;
    top: 39%;
    left: 26%;
    animation-duration: 20s;
    animation-delay: -30s;
    transform-origin: -10vw 16vh;
    box-shadow: 8vmin 0 1.6460623837802222vmin currentColor;
  }
  .background span:nth-child(31) {
    color: #FFACAC;
    top: 48%;
    left: 42%;
    animation-duration: 8s;
    animation-delay: -12s;
    transform-origin: -4vw -19vh;
    box-shadow: -8vmin 0 1.0947390098115044vmin currentColor;
  }
  .background span:nth-child(32) {
    color: #E45A84;
    top: 33%;
    left: 12%;
    animation-duration: 35s;
    animation-delay: -16s;
    transform-origin: -21vw 12vh;
    box-shadow: -8vmin 0 1.607355379175779vmin currentColor;
  }
  .background span:nth-child(33) {
    color: #FFACAC;
    top: 41%;
    left: 61%;
    animation-duration: 48s;
    animation-delay: -6s;
    transform-origin: -5vw 18vh;
    box-shadow: -8vmin 0 1.822829770083996vmin currentColor;
  }
  .background span:nth-child(34) {
    color: #FFACAC;
    top: 77%;
    left: 90%;
    animation-duration: 39s;
    animation-delay: -23s;
    transform-origin: 15vw -5vh;
    box-shadow: 8vmin 0 1.1801190985084333vmin currentColor;
  }
  .background span:nth-child(35) {
    color: #E45A84;
    top: 83%;
    left: 9%;
    animation-duration: 8s;
    animation-delay: -2s;
    transform-origin: 3vw -23vh;
    box-shadow: -8vmin 0 1.394684543423571vmin currentColor;
  }

}
</style>
