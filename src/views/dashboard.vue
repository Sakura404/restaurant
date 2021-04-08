<template>
	<v-container>
		<v-row>
			<v-col md=6  cols=12>
				<v-card>
					<v-sheet class=" mx-auto" elevation="12" max-width="calc(100% - 32px)" color='cyan'>
						<v-sparkline color='white' line-width="2" padding="16" :labels='day()' smooth=10
							:value='daysale'>
						</v-sparkline>
					</v-sheet>
				</v-card>
			</v-col>
			{{day()}}
		</v-row>
	</v-container>
</template>
<script>
	export default {
		data() {
			return {
				daysale: [10, 20, 12,24,17,45,73, 30, 41],
			}
		},
		methods: {
			day() {
				var x = new Array()
				for (var i = 0; i < this.daysale.length; i++) {
					x.push(i + 1)
				}
				return x
			}
		}
	}
</script>
