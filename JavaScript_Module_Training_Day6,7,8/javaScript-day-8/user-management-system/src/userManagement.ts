interface User<T> {
    name: T;
    email: T;
    role: T;
}

function addUser(): void {
    const nameInput = document.getElementById('user-name') as HTMLInputElement;
    const emailInput = document.getElementById('user-email') as HTMLInputElement;
    const roleSelect = document.getElementById('user-role') as HTMLSelectElement;
    const addBtn = document.getElementById('user-add-btn') as HTMLButtonElement;
    const userList = document.getElementById('users-data') as HTMLDivElement;

    if (!nameInput.checkValidity() || !emailInput.checkValidity() || !roleSelect.checkValidity()) {
        const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'Please fill in all required fields correctly!';
        return;
    }

    if (addBtn.classList.contains("update-btn")) {
        const index = parseInt(addBtn.getAttribute('data-index') || '', 10);
        const userElement = document.getElementById(`user-${index}`) as HTMLElement;

        if (userElement) {
            const existingName = (userElement.querySelector('.user-data-name') as HTMLElement).getAttribute('data-name');
            const existingEmail = (userElement.querySelector('.user-data-email') as HTMLElement).getAttribute('data-email');

            const userExists = Array.from(userList.children).some(child => {
                const nameSpan = (child.querySelector('.user-data-name') as HTMLElement).getAttribute('data-name');
                const emailSpan = (child.querySelector('.user-data-email') as HTMLElement).getAttribute('data-email');
                return (nameSpan === nameInput.value && nameSpan !== existingName) ||
                       (emailSpan === emailInput.value && emailSpan !== existingEmail);
            });

            if (userExists) {
                const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = 'User with this name or email already exists!';
                return;
            }

            UpdateUser(nameInput, emailInput, roleSelect, index);
            addBtn.textContent = "Add User";
            addBtn.classList.remove("update-btn");
            return;
        }
    }

    const userExists = Array.from(userList.children).some(child => {
        const nameSpan = (child.querySelector('.user-data-name') as HTMLElement).getAttribute('data-name');
        return nameSpan === nameInput.value;
    });

    const emailExists = Array.from(userList.children).some(child => {
        const emailSpan = (child.querySelector('.user-data-email') as HTMLElement).getAttribute('data-email');
        return emailSpan === emailInput.value;
    });

    if (userExists || emailExists) {
        const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
        errorMessage.style.display = 'block';
        if (userExists && emailExists) {
            errorMessage.innerHTML = 'User with this name and email already exists!';
        } else if (userExists) {
            errorMessage.innerHTML = 'User with this name already exists!';
        } else if (emailExists) {
            errorMessage.innerHTML = 'User with this email already exists!';
        }
        nameInput.value = '';
        emailInput.value = '';
        roleSelect.value = 'user';
        return;
    }

    const newUser: User<string> = {
        name: nameInput.value,
        email: emailInput.value,
        role: roleSelect.value
    };

    const userIndex = userList.children.length;
    const userElement = createUserElement(newUser, userIndex);
    userList.appendChild(userElement);

    nameInput.value = '';
    emailInput.value = '';
    roleSelect.value = 'user';
    const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
    errorMessage.style.display = 'none';
    errorMessage.innerHTML = '';
}

function createUserElement(newUser: User<string>, index: number): HTMLElement {
    const userDiv = document.createElement('div');
    userDiv.className = "user-data";
    userDiv.id = `user-${index}`;

    const nameSpan = document.createElement('span');
    nameSpan.className = "user-data-name";
    nameSpan.textContent = `${index + 1}. ${newUser.name}`;
    nameSpan.setAttribute('data-name', newUser.name);

    const emailSpan = document.createElement('span');
    emailSpan.className = "user-data-email";
    emailSpan.textContent = newUser.email;
    emailSpan.setAttribute('data-email', newUser.email);

    const roleSpan = document.createElement('span');
    roleSpan.className = "user-data-role";
    roleSpan.textContent = newUser.role;
    roleSpan.setAttribute('data-role', newUser.role);

    const actionDiv = document.createElement('div');
    actionDiv.className = "action-button";

    const editBtn = document.createElement('button');
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editUser(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteUser(index);

    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    userDiv.appendChild(nameSpan);
    userDiv.appendChild(emailSpan);
    userDiv.appendChild(roleSpan);
    userDiv.appendChild(actionDiv);

    return userDiv;
}

function editUser(index: number): void {
    const userElement = document.getElementById(`user-${index}`) as HTMLElement;

    const userName = (userElement.querySelector('.user-data-name') as HTMLElement).getAttribute('data-name') || '';
    const userEmail = (userElement.querySelector('.user-data-email') as HTMLElement).getAttribute('data-email') || '';
    const userRole = (userElement.querySelector('.user-data-role') as HTMLElement).getAttribute('data-role') || '';

    const nameInput = document.getElementById('user-name') as HTMLInputElement;
    const emailInput = document.getElementById('user-email') as HTMLInputElement;
    const roleSelect = document.getElementById('user-role') as HTMLSelectElement;

    nameInput.value = userName;
    emailInput.value = userEmail;
    roleSelect.value = userRole;

    const userAddBtn = document.getElementById("user-add-btn") as HTMLButtonElement;
    userAddBtn.textContent = "Update User";
    userAddBtn.classList.add("update-btn");
    userAddBtn.setAttribute('data-index', index.toString());
}

function UpdateUser(name: HTMLInputElement, email: HTMLInputElement, role: HTMLSelectElement, index: number): void {
    const userElement = document.getElementById(`user-${index}`) as HTMLElement;
    const userList = document.getElementById('users-data') as HTMLDivElement;

    const userExists = Array.from(userList.children).some(child => {
        const nameSpan = (child.querySelector('.user-data-name') as HTMLElement).getAttribute('data-name');
        const emailSpan = (child.querySelector('.user-data-email') as HTMLElement).getAttribute('data-email');
        return (nameSpan === name.value && nameSpan !== (userElement.querySelector('.user-data-name') as HTMLElement).getAttribute('data-name')) ||
               (emailSpan === email.value && emailSpan !== (userElement.querySelector('.user-data-email') as HTMLElement).getAttribute('data-email'));
    });

    if (userExists) {
        const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'User with this name or email already exists!';
        return;
    }

    if (userElement) {
        const nameSpan = userElement.querySelector(".user-data-name") as HTMLElement;
        const emailSpan = userElement.querySelector(".user-data-email") as HTMLElement;
        const roleSpan = userElement.querySelector(".user-data-role") as HTMLElement;

        nameSpan.textContent = `${index + 1}. ${name.value}`;
        nameSpan.setAttribute('data-name', name.value);

        emailSpan.textContent = email.value;
        emailSpan.setAttribute('data-email', email.value);

        roleSpan.textContent = role.value;
        roleSpan.setAttribute('data-role', role.value);
        name.value = '';
        email.value = '';
        role.value = 'user';
    }
}

function deleteUser(index: number): void {
    const userElement = document.getElementById(`user-${index}`);
    if (userElement) {
        userElement.remove();
    }
}
