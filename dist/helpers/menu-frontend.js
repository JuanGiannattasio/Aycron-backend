"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuFrontend = void 0;
const getMenuFrontend = (role = 'USER_ROLE') => {
    const menu = [];
    if (role === 'ADMIN_ROLE') {
        menu.push({
            title: 'Admin',
            submenu: [
                {
                    title: 'Users',
                    url: 'users/get'
                },
                {
                    title: 'Burgers',
                    url: 'burgers/get'
                }
            ]
        });
    }
    return menu;
};
exports.getMenuFrontend = getMenuFrontend;
//# sourceMappingURL=menu-frontend.js.map