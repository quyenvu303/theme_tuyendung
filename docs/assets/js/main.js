// tooltip 
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// utilities
function stringUnaccentedVietnamese(accentedVietnamese) {
    return accentedVietnamese.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function toggleDropdown(button) {
    // dropdown checkable
    if (!button.parentElement.children[1].classList.contains('dropdown-sortby-list')) {
        // dropdown checkable close default
        if (button.parentElement.classList.contains('dropdown-idc--close')) {
            button.querySelectorAll('svg')[0].classList.toggle('d-none');
            button.querySelectorAll('svg')[1].classList.toggle('d-block');

            button.parentElement.children[1].classList.toggle('d-block');
            return;
        }

        // dropdown checkable open default
        // svg icon down
        button.querySelectorAll('svg')[0].classList.toggle('d-block');
        // svg icon up
        button.querySelectorAll('svg')[1].classList.toggle('d-none');

        // list item dropdown hidden
        button.parentElement.children[1].classList.toggle('d-none');
        return;
    }

    // dropdown sortby list
    button.querySelectorAll('svg')[0].classList.toggle('d-none');
    button.querySelectorAll('svg')[1].classList.toggle('d-block');

    button.parentElement.children[1].classList.toggle('d-block');
}

document.addEventListener("DOMContentLoaded", function () {
    // checkbox
    let checkbox = document.getElementById("flexCheckIndeterminate");
    if (checkbox) checkbox.indeterminate = true; // Set indeterminate state

    // select box
    document.querySelectorAll('.select-box__heading input').forEach(input => {
        const selectBox = input.closest('.select-box')
        const dropdownList = selectBox.querySelector('.select-box__list');
        const selectIcon = input.nextElementSibling;

        // handle open dropdown
        const dropdownOpen = () => {
            dropdownList.style.display = 'block';
            selectIcon.classList.add('select-box__state--up');
        }

        // handle close dropdown
        const dropdownClose = () => {
            dropdownList.style.display = 'none';
            selectIcon.classList.remove('select-box__state--up');
        }

        // input click
        input.addEventListener('click', () => {
            dropdownOpen();
        })

        // select icon click
        selectIcon.addEventListener('click', () => {
            if (dropdownList.style.display === 'none') {
                dropdownOpen();
                return;
            }

            dropdownClose();
        })

        // click outside
        document.addEventListener('click', (e) => {
            if (!selectBox.contains(e.target)) {
                dropdownClose();
            }
        })

        // press asc
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                dropdownClose();
            }
        })

        // option li click
        dropdownList.querySelectorAll('li').forEach(e => {
            e.addEventListener('click', () => {
                input.value = e.textContent;
                dropdownClose();
            })
        })

        // list value in dropdown list
        const list = [...dropdownList.querySelectorAll('li')]
            .map((li) => li.textContent);
        // input search
        input.addEventListener('input', (e) => {
            const keyword = e.target.value
            // filter string character vietnamese: tiếng việt -> viet -> match
            const filterList = list.filter(
                (value) => stringUnaccentedVietnamese(value)
                    .includes(stringUnaccentedVietnamese(keyword))
            )
            dropdownList.innerHTML = '';

            if (filterList?.length > 0) {
                filterList.forEach((value) => {
                    // create li and add event listener
                    let li = document.createElement('li');
                    li.addEventListener('click', () => {
                        input.value = value;
                        dropdownClose();
                    })

                    li.textContent = value;
                    dropdownList.appendChild(li);
                })

                dropdownList.style.border = '1px solid var(--idc-gray-2)';
                return;
            }

            dropdownList.style.border = 'none';
        })
    })
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.body.classList.add('press-tab-active')
});

document.addEventListener('click', () => {
    document.body.classList.remove('press-tab-active')
});

document.querySelectorAll('.navbar-toggler').forEach((element) => {
    element.addEventListener('click', () => {
        const icon = element.querySelector('path');
        if (!icon) return;

        const isOpen = element.classList.contains('is-open');

        if (!isOpen) {
            icon.setAttribute('d', "M3 3L17 17M17 3L3 17");
            element.classList.add('is-open');
        } else {
            icon.setAttribute('d', "M2.5 10H17.5M2.5 5H17.5M2.5 15H17.5");
            element.classList.remove('is-open');
        }
    });
});
