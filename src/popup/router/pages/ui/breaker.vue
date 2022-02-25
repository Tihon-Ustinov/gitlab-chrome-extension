<template>
    <label class="power">
        <input type="checkbox" v-model="state">
        <div>
            <svg viewBox="0 0 44 44">
                <path d="M22,6 C31,6 38,13 38,22 C38,31 31,38 22,38 C13,38 6,31 6,22 C6,13 13,6 22,6 L22,28" id="path"></path>
            </svg>
        </div>
    </label>
</template>

<script>
  export default {
    name: "breaker",
    props: {
      defaultState: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        state: true
      };
    },
    model: {
      event: 'toggle'
    },
    watch: {
      defaultState: function (newVal) {
        this.state = newVal
      },
      state: function (newVal) {
        this.$emit('toggle', newVal)
      }
    },
    created() {
      this.state = this.defaultState
    }
  }
</script>

<style lang="scss" scoped>
    $off: #EB2C59;
    $on: #21E76E;

    .power {
        display: table;
        cursor: pointer;
        input {
            display: none;
            & + div {
                position: relative;
                overflow: hidden;
                background: $off;
                border-radius: 50%;
                padding: 18px;
                transition: transform .4s ease;
                filter: drop-shadow(0 4px 6px rgba($off, .3));
                &:before {
                    content: '';
                    width: 4px;
                    height: 14px;
                    border-radius: 2px;
                    background: #fff;
                    position: absolute;
                    left: 50%;
                    z-index: 2;
                    margin: 0 0 0 -2px;
                    top: 18px;
                    opacity: 1;
                    transform: scaleY(1) translate(0, 2px);
                    transition: opacity .4s ease .1s, transform .9s ease .4s;
                }
                &:after {
                    content: '';
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 200%;
                    height: 200%;
                    border-radius: 50%;
                    background: $on;
                    transform: translate(100%, 100%);
                    transform-origin: right bottom;
                    transition: transform .8s ease;
                }
                svg {
                    width: 36px;
                    height: 36px;
                    fill: none;
                    display: block;
                    stroke: #fff;
                    position: relative;
                    z-index: 2;
                    stroke-width: 5;
                    stroke-linecap: round;
                    stroke-dasharray: 84;
                    stroke-dashoffset: 160;
                    transform: translate3d(0, 0, 0);
                    transition: stroke-dasharray .6s ease 0s, stroke-dashoffset .7s ease .0s;
                }
                &:active {
                    transform: scale(.96);
                }
            }
            &:checked + div {
                filter: drop-shadow(0 4px 6px rgba($on, .3));
                svg {
                    stroke-dasharray: 120;
                    stroke-dashoffset: 133;
                    transition: stroke-dasharray .6s ease .45s, stroke-dashoffset .7s cubic-bezier(.94, -.1, .1, 1.2) .2s;
                }
                &:before {
                    transform: scaleY(0) translate(0, 7px);
                    transition: opacity .4s ease .0s, transform .6s ease .3s;
                }
                &:after {
                    transform: translate(40%, 40%);
                }
            }
        }
    }

    // Center & dribbble
    body {
        min-height: 100vh;
        font-family: Roboto, Arial;
        color: #ADAFB6;
        display: flex;
        justify-content: center;
        align-items: center;
        .dribbble {
            position: fixed;
            display: block;
            right: 20px;
            bottom: 20px;
            opacity: .5;
            transition: all .4s ease;
            &:hover {
                opacity: 1;
            }
            img {
                display: block;
                height: 36px;
            }
        }
    }
</style>
