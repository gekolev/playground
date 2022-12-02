<template>
<div class="video-player overflow-hidden">
    <video id="video"
           class="video responsive"
           ref="video"
           :key='preload'
           :preload="preload || 'meta'"
           @canplaythrough="onCanPlay"
           @play="playHandle"
           @pause="pauseVideo"
           @seeking="preventPause"
           playsinline
           :poster="videoPoster"
           :muted="!playSound && muted"
           :loop='loop'
           :controls="controls">
        <source :src="url"
                type="video/mp4">
    </video>
</div>

</template>

<script>

export default {
    name: 'video-player',

    data: () => ({
        cantplay: false,
        muted: true,
        loop: true,
        videoPoster: null
    }),

    props: [
        'url',
        'playing',
        'playSound',
        'autoplay',
        'preload',
        'posterUrl',
        'controls'
    ],

    mixins: [
    ],

    watch: {
        cantplay() {
            this.videoPoster = this.posterUrl
        },

        playing(playing){
            if(playing){
                this.playVideo()
            }else{
                this.$refs.video && this.$refs.video.pause()
            }
        },

        animationDelay() {
            if(this.autoplay){
                this.t && clearTimeout(this.t)
                this.t = setTimeout(() => {
                    this.playVideo()
                }, this.animationDelay)
            }
        }
    },

    mounted()  {
        
    },

    beforeDestroy() {
        this.$refs.video && this.$refs.video.pause()
    },

    methods: {
        onCanPlay(e){
            if(this.autoplay){
                this.t && clearTimeout(this.t)
                setTimeout(() => {
                    this.playVideo()
                }, this.animationDelay)
            }
        },

        playVideo(e)  {

            console.log('play video')

            if (!this.$refs.video) {
                return
            }

            let promise = this.$refs.video.play()

            if (promise !== undefined) {
                promise.then(_ => {
                    // video playing
                }).catch(error => {
                    this.cantplay = true
                })
            }

        },

        toggleVideoPlay()  {
            // this.playing = !this.playing
        },

        playHandle()  {},

        pauseVideo()  {},

        preventPause()  {
            this.seeking = true
        }
    },

    computed: {
      animationDelay() {
        return this.$store.getters['app/getState']('animationDelay') * 1000 || 1100
      }
    },

    components: {}
};

</script>

<style lang="scss" scoped="">
.video-player {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
}

.video {
    // &.not-responsive {
      width: 100%;
      height: 100%;
      object-fit: cover;
    // }
    &.responsive {
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translateX(-50%) translateY(-50%);
        // min-width: 100%;
        // min-height: 100%;
        // width: auto;
        // height: auto;
        // background-size: cover;
    }
}
</style>


<style lang="scss">
.isIE, .isEdge{

    .video-player{        
        .video{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
        }
    }
}
</style>