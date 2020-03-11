export default function Mixin(source, mixin) {
    Object.assign(source.prototype, mixin);
}