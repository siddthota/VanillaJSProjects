let currentMenu = null;
let menuItems = document.getElementsByClassName("main-menu-item");
const navbar = document.getElementsByClassName("navbar")[0];
const subMenu = document.getElementsByClassName("sub-menu")[0];

// remove active class on mouse leave from subMenu
subMenu.onmouseleave = deleteDropdownMenu;
// hide submenu when mouse leaves navbar
navbar.onmouseleave = hideSubMenu;

init();

// init function that triggers hide submenu utility to hide the submenu.
function init() {
    hideSubMenu();
}

// trigger submenu when mouse enters into one of the menu options
for(const menuItem of menuItems) {
    menuItem.onmouseenter = function() {
        setCurrentMenuToActive(menuItem);
    }
}

// hide submenu utility
function hideSubMenu() {
    const subMenu = document.getElementsByClassName("sub-menu")[0];
    subMenu.style.display = "none";
}

// remove active class to the previous menu item utility
function deleteDropdownMenu() {
    currentMenu.classList.remove("active");
}

// set active class to current menu item and trigger showSubmenu
function setCurrentMenuToActive(item) {
    if(currentMenu) {
        currentMenu.classList.remove("active");
    }
    currentMenu = item;
    item.classList.add("active");
    showSubMenu();
}

// show submenu utility
function showSubMenu() {
    const subMenu = document.getElementsByClassName("sub-menu")[0];
    subMenu.style.display = "block";
    displaySubMenu();
}

// trigger sub-menu details of the respective menu item you hover over.
function displaySubMenu() {
    let currentActiveMenuName = currentMenu.children[0].innerHTML.split(" ");
    let subCategories = getCategories(currentActiveMenuName[3]);
    if(subCategories.top == undefined && subCategories.addition == undefined) {
        hideSubMenu();
    }
    if(subCategories.top) {
        let addTopCategoryItems = "";
        for(const top of subCategories.top) {
            const topCategoryElement = `<li class="sub-menu-item">
                                            <a href="#">${top}</a>
                                        </li>`;
            addTopCategoryItems += topCategoryElement; 
        }
        const topSubCategories = document.getElementsByClassName('sub-menu-top-items')[0];
        topSubCategories.innerHTML = addTopCategoryItems;
    }
    if(subCategories.addition) {
        let addAdditionCategoryItems = "";
        for(const addition of subCategories.addition) {
            const additionCategoryElement = `<li class="sub-menu-item">
                                            <a href="#">${addition}</a>
                                            </li>`;
            addAdditionCategoryItems += additionCategoryElement; 
        }
        const additionSubCategories = document.getElementsByClassName('sub-menu-add-items')[0];
        additionSubCategories.innerHTML = addAdditionCategoryItems;
    }
}

// get categories based on menu item you hovered in the Menu
function getCategories(data) {
    let category = {};
    if(data === "Electronics") {
        category.top = ['Phones', 'Tables', 'TV', 'Gaming', 'Headphones'];
        category.addition = ['Printers', 'Fitness Tracker', 'Cameras']
        
    }
    if(data === "Furniture") {
        category.top = ['Couch', 'Mattress', 'Chairs', 'Patio'];
        category.addition = ['Kitchen', 'Bedroom', 'Living Room']
    }
    if(data === "Toys") {
        category.top = ['LEGO', 'Puzzles', 'Arts', 'Board Games'];
        category.addition = ['Bikes', 'Hover Board', 'Plush Toys']
    }
    return category;
}
