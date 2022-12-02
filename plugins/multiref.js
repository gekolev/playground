import Vue from 'vue'

function addRef(el, binding, vnode) {
    const ref = binding.arg
    const vm = vnode.context
    const thing = vnode.componentInstance || vnode.elm
    if (!vm.$refs.hasOwnProperty(ref)) {
        vm.$refs[ref] = []
    }
    const index = vm.$refs[ref].indexOf(thing)
    if (index == -1) {
        vnode.context.$refs[ref].push(thing)
    }
}

function removeRef(el, {arg: ref}, {context: vm}, vnode) {
    if (vm.$refs.hasOwnProperty(ref)) {
        const arr = vm.$refs[ref]
        const thing = vnode.componentInstance || vnode.elm
        const index = arr.indexOf(thing)
        if (index) {
            arr.splice(index, 1)
        }
    }
}

Vue.directive('multi-ref', {
    bind: addRef,
    update: addRef,
    unbind: removeRef
})
