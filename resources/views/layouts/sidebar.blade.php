<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">

    <div class="app-brand mt-4 mb-3 ps-3">
        <a href="/" class="app-brand-link">
            <span class="app-brand-text fw-bold fs-4">
                Reset & Go
            </span>
        </a>
        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">

        <li class="menu-item {{ Request::is('dashboard') ? 'active' : '' }}">
            <a href="{{ route('dashboard') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div>Dashboard</div>
            </a>
        </li>

        @if(in_array(auth()->user()->rol, ['admin', 'empleado']))
        <li class="menu-item {{ request()->routeIs('productos.*') ? 'active' : '' }}">
            <a href="{{ route('productos.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-box"></i>
                <div>Inventario & Celulares</div>
            </a>
        </li>
        @endif

        <li class="menu-item {{ Request::is('clientes*') ? 'active' : '' }}">
            <a href="{{ route('clientes.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-user"></i>
                <div>Clientes</div>
            </a>
        </li>
        @if(auth()->user()->rol === 'admin')
        <li class="menu-item {{ Request::is('mano-obra*') ? 'active' : '' }}">
            <a href="{{ route('mano_obra.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-list-ul"></i>
                <div data-i18n="Tarifario">Tarifario</div>
            </a>
        </li>
        @endif

        <li class="menu-item {{ Request::is('arreglos*') ? 'active' : '' }}">
            <a href="{{ route('arreglos.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-wrench"></i>
                <div data-i18n="Arreglos">Reparaciones</div>
            </a>
        </li>

        @if(auth()->user()->rol === 'admin')
        <li class="menu-item {{ request()->routeIs('personal.*') ? 'active' : '' }}">
            <a href="{{ route('personal.index') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-hard-hat"></i>
                <div>Empleados</div>
            </a>
        </li>
        @endif

        

        <li class="menu-header small text-uppercase">
            <span class="menu-header-text">Cuenta</span>
        </li>

        <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
                <i class="menu-icon tf-icons bx bx-user-circle"></i>
                <div>{{ auth()->user()->persona->nombre ?? 'Mi Cuenta' }}</div>
            </a>

            <ul class="menu-sub">
                <li class="menu-item">
                    <a href="{{ route('perfil.show') }}" class="menu-link">
                        <i class="menu-icon tf-icons bx bx-user"></i>
                        <div data-i18n="Ver Perfil">Ver Perfil</div>
                    </a>
                </li>



                <li class="menu-item">
                    <form action="{{ route('logout') }}" method="POST" class="d-inline w-100">
                        @csrf
                        <button type="submit" class="menu-link border-0 bg-transparent w-100 text-start" style="cursor: pointer;">
                            <i class="bx bx-power-off me-2 text-danger"></i>
                            <span class="text-danger">Cerrar sesión</span>
                        </button>
                    </form>
                </li>
            </ul>
        </li>
    </ul>
</aside>