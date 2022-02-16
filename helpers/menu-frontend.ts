

export const getMenuFrontend = ( role: string = 'USER_ROLE' ) => {

    const menu = [];

    if ( role === 'ADMIN_ROLE' ) {
        menu.push(
            {
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
            }
        )
    }

    return menu;

}