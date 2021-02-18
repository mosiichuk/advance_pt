function Accordion(options) {
    let element = document.getElementById(options.element),
        oneOpen = options.oneOpen || false;

    const titleClass = 'accordion-title',
        openedTitleClass= 'accordion-title--open',
        contentClass = 'accordion-content',
        contentHiddenClass = 'accordion-content--hidden';

    render();

    function render() {
        [].forEach.call(element.querySelectorAll('button'),
            function (item) {
                item.classList.add(titleClass);
                item.nextElementSibling.classList.add(contentClass);
            });

        element.addEventListener('click', onClick);

        closeOthers();
    }

    function onClick(e) {
        const item = e.target;

        if (!item.classList.contains(titleClass))
            return;

        if (oneOpen)
            closeOthers(item.nextElementSibling);

        toggle(item);
    }

    function closeOthers(except) {
        [].forEach.call(element.getElementsByClassName(contentClass), (item) => {
            if (except === undefined || item !== except) {
                item.classList.add(contentHiddenClass);
            }
        });
    }

    function toggle(el) {
        el.classList.toggle(openedTitleClass);
        el.nextElementSibling.classList.toggle(contentHiddenClass);
    }
}

export default Accordion;
