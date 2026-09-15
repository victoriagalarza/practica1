¿Qué función cumple la escena en Three.js?

Es el contenedor 3D principal (un "universo" virtual) donde se colocan y organizan todos los objetos, luces, cámaras y modelos para que puedan ser procesados.

¿Para qué sirve la cámara?

Define el punto de vista y el campo de visión desde el cual el usuario observa la escena, aplicando la perspectiva matemática de profundidad.

¿Qué hace el renderer?

Toma la información de la escena y la cámara para calcular la iluminación, sombras y materiales, dibujando el resultado final en la pantalla dentro de un elemento <canvas>.

¿Qué permite hacer OrbitControls?

Otorga interactividad permitiendo al usuario rotar alrededor de un objeto, hacer zoom (acercar/alejar) y desplazar la toma usando el mouse o gestos táctiles.

¿Qué es el raycasting y para qué lo usaste?

Es una técnica que proyecta un rayo invisible desde el cursor del mouse hacia el espacio 3D; se usó para detectar en qué objeto se hace clic, cambiar su color y mostrar su información.

¿Qué dificultades tuviste al cargar modelos .glb o .gltf?

El bloqueo por políticas de seguridad (CORS) al abrir el HTML de forma local sin un servidor web, y la necesidad de ajustar manualmente escalas muy grandes o pequeñas e importar correctamente el GLTFLoader.

¿Cómo podrías usar este visor 3D en un proyecto de simulación, videojuegos, bioinformática o modelado 3D?

Para renderizar e interactuar con moléculas 3D, seleccionando átomos con raycasting para ver sus datos
