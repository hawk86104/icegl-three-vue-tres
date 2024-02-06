
<template>
	<pagesShow>
		<template v-slot:ability>
			<Suspense>
				<fireB />
			</Suspense>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">

import pagesShow from '../components/pagesShow.vue'
import fireB from '../components/fire/fireB.vue'

</script>
