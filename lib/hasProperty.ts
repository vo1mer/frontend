export default function hasProperty <T, Prop extends string>(obj: T, prop: Prop): obj is T & Record<Prop, unknown> {
	if (!obj) {
		return false;
	}
	return Object.prototype.hasOwnProperty.call(obj, prop);
};