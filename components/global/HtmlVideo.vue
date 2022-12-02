<template>
<figure class="video-player overflow-hidden w-100 h-100">
    <video id="video"
           class="video responsive"
           ref="video"
           :key='preload'
           :preload="preload"
           @click='toggleOnClick ? togglePlaying : null'
           @canplaythrough="onCanPlay"
           @pause="pauseVideo"
           @seeking="preventPause"
           @timeupdate='onTimeupdate'
           @play='onPlay'
           :playsinline='playsinline'
           :autoplay='autoplay'
           :poster="videoPoster"
           :muted="muted"
           :loop='loop'
           :controls="controls">
        <source :src="src"
                type="video/mp4">
    </video>
</figure>

</template>

<script>

export default {
    name: 'video-player',

    data: () => ({
        cantplay: false,
        videoPoster: null
    }),

    props: {
        'src': String,
        'playing': Boolean,
        'currentTime': Number,
        'autoplay': Boolean,
        'preload': {
            type: String,
            default: 'auto'
        },
        'posterUrl': String,
        'controls': Boolean,
        'loop': Boolean,
        'toggleOnClick': Boolean,
        'forcePoster': Boolean,
        'muted': {
            type: Boolean,
            default: true
        },
        'playsinline': {
            type: Boolean,
            default: true
        }
    },

    mixins: [
    ],

    watch: {
        cantplay() {
            this.videoPoster = this.posterUrl
        },

        currentTime(c, old) {
            if(this.$refs.video.currentTime.toFixed(1) != c.toFixed(1)){
                this.$refs.video.currentTime = c
            }
        },

        autoplay(ap) {
            ap ? this.playVideo() : this.pauseVideo()
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

    created()  {
        if(this.forcePoster) {
            this.videoPoster = this.posterUrl
        }
    },

    beforeDestroy() {
        this.$refs.video && this.$refs.video.pause()
    },

    methods: {
        onCanPlay(e){
            this.$emit('canplay', this.$refs.video)

            if(this.autoplay){
                this.t && clearTimeout(this.t)
                setTimeout(() => {
                    this.playVideo()
                }, this.animationDelay)
            }
        },

        onTimeupdate(e) {
            if(!this.$refs.video){
                return
            }

            this.$emit('update:currentTime', this.$refs.video.currentTime)
        },

        onPlay() {
            this.$emit('update:playing', true)
        },

        onPause() {
            this.$emit('update:playing', false)
        },

        togglePlaying() {
            this.playing ? this.pauseVideo() : this.playVideo()
        },

        playVideo(e)  {
            if (!this.$refs.video) {
                return
            }

            let promise = this.$refs.video.play()

            if (promise !== undefined) {
                promise.then(_ => {
                    this.$emit('update:playing', true)
                    // video playing
                }).catch(error => {
                    this.cantplay = true
                    this.$emit('update:playing', false)
                    console.warn(`can't autoplay`)
                })
            }

        },

        pauseVideo()  {
            this.$emit('update:playing', false)
            this.$refs.video && this.$refs.video.pause()
        },

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
    overflow: hidden;
    position: relative;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
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