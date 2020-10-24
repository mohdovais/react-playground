export function debounced(
    task: Function,
    duration: number = 250,
    scope?: Object
) {
    let timer: number;

    return function() {
        function later(arg: any[]) {
            clearTimeout(timer);
            task.apply(scope, arg);
        }

        clearTimeout(timer);

        //Array.from
        timer = setTimeout(later, duration, Array.prototype.slice.call(arguments));
    };
}
