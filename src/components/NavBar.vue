<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <span class="navbar-brand">Task-App</span>
        <ul class="navbar-nav ms-auto">
          <li v-if="$store.getters.isUserAuthenticated" class="nav-item">
            <button
              @click="$store.commit('LOGOUT_USER'), $router.push('/')"
              class="btn btn-sm btn-secondary"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
