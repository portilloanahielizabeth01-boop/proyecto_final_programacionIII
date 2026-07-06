<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    
    <!-- Logo y Título -->
    <div class="app-brand mt-4 mb-3 ps-3">
        <a href="/" class="app-brand-link">
            <span class="app-brand-text fw-bold fs-4">
                Servicio Técnico
            </span>
        </a>
        <!-- Botón para cerrar menú en móviles (visible solo en pantallas chicas) -->
        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
        <!-- Dashboard -->
        <li class="menu-item {{ Request::is('dashboard') ? 'active' : '' }}">
            <a href="/" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div>Dashboard</div>
            </a>
        </li>

        <!-- Clientes -->
        <li class="menu-item {{ Request::is('clientes*') ? 'active' : '' }}">
            <a href="{{ route('clientes.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-user"></i>
                <div>Clientes</div>
            </a>
        </li>

        <!-- Otros Módulos -->
        <li class="menu-item">
            <a href="{{ route('personal.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-hard-hat"></i>
                <div>Empleados</div>
            </a>
        </li>

        <li class="menu-item">
            <a href="#" class="menu-link">
                <i class="menu-icon tf-icons bx bx-mobile"></i>
                <div>Celulares</div>
            </a>
        </li>

        <li class="menu-item">
            <a href="#" class="menu-link">
                <i class="menu-icon tf-icons bx bx-wrench"></i>
                <div>Reparaciones</div>
            </a>
        </li>

        <!-- Separador de Cuenta -->
        <li class="menu-header small text-uppercase">
            <span class="menu-header-text">Cuenta</span>
        </li>

        <!-- Menú de Usuario Desplegable -->
        <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
                <i class="menu-icon tf-icons bx bx-user-circle"></i>
                <div>{{ Auth::user()->name ?? 'Mi Cuenta' }}</div>
            </a>
            
            <ul class="menu-sub">
                <li class="menu-item">
                    <a href="#" class="menu-link">
                        <i class="bx bx-user me-2"></i>
                        <div>Ver Perfil</div>
                    </a>
                </li>
                
                <li class="menu-item">
                    <a href="#" class="menu-link">
                        <i class="bx bx-cog me-2"></i>
                        <div>Configuración</div>
                    </a>
                </li>

                <li class="menu-item">
                    <form action="{{ route('logout') }}" method="POST" class="d-inline w-100">
                        @csrf
                        <button type="submit" class="menu-link border-0 bg-transparent w-100 text-start" style="cursor: pointer;">
                            <i class="bx bx-power-off me-2 text-danger"></i>
                            <div class="text-danger">Cerrar sesión</div>
                        </button>
                    </form>
                </li>
            </ul>
        </li>
    </ul>
</aside>