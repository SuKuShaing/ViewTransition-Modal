async function toggleDialog(dialogId) {
	const viewTransitionClass = "vt-element-animation"; // se ocupará este nombre de clase para el despliegue de la animación
	const viewTransitionClassClosing = "vt-element-animation-closing"; // se ocupará este nombre de clase para el cierre de la animación

	// PARA CERRAR EL DIALOGO
	if (!dialogId) {
		const openDialog = document.querySelector("dialog[open]"); // se obtiene el dialogo abierto
		const originElement = document.querySelector("[origin-element]"); // se obtiene el elemento button original

		openDialog.style.viewTransitionName = "vt-shared"; // se le asigna el nombre de la transición
		openDialog.style.viewTransitionClass = viewTransitionClassClosing; // se le asigna el nombre de la clase de la transición

		const viewTransition = document.startViewTransition(() => { // al comenzar la transición se ejecuta el siguiente código (el callback)
			originElement.style.viewTransitionName = "vt-shared"; // se le asigna el nombre de la transición
			originElement.style.viewTransitionClass = viewTransitionClassClosing; // se le asigna el nombre de la clase de la transición

			openDialog.style.viewTransitionName = ""; // se le quita el nombre de la transición
			openDialog.style.viewTransitionClass = ""; // se le quita el nombre de la clase de la transición
			openDialog.close(); // se cierra el dialogo
		});

		await viewTransition.finished; // se espera a que termine la transición

        originElement.style.viewTransitionName = ""; // se le quita el nombre de la transición
        originElement.style.viewTransitionClass = ""; // se le quita el nombre de la clase de la transición
        originElement.removeAttribute("origin-element"); // se le quita el atributo origin-element al botón de origen para que otro lo pueda tomar

		return;
	}


	// PARA ABRIR EL DIALOGO
	const dialog = document.getElementById(dialogId); // se obtiene el nodo dialogo
	const originElement = event.currentTarget; // se obtiene el elemento que se hizo click

	dialog.style.viewTransitionName = "vt-shared"; // se le asigna el nombre de la transición
	dialog.style.viewTransitionClass = viewTransitionClass; // se le asigna el nombre de la clase de la transición
	// se les asigna el mismo nombre y clase de transición para que se vean en conjunto, es un hack para que se vean en conjunto
	originElement.style.viewTransitionName = "vt-shared"; // se le asigna el nombre de la transición
	originElement.style.viewTransitionClass = viewTransitionClass; // se le asigna el nombre de la clase de la transición
	originElement.setAttribute("origin-element", ""); // se le asigna el atributo origin-element al botón de origen para que se pueda identificar

    const viewTransition = document.startViewTransition(() => { // al comenzar la transición se ejecuta el siguiente código (el callback)
        originElement.style.viewTransitionName = ""; // se le quita el nombre de la animación
        originElement.style.viewTransitionClass = ""; // se le quita la clase de la animación
        dialog.showModal(); // se muestra el dialogo
    });

    await viewTransition.finished; // se espera a que termine la transición

	dialog.style.viewTransitionName = ""; // se le quita el nombre de la animación
	dialog.style.viewTransitionClass = ""; // se le quita la clase de la animación
}
