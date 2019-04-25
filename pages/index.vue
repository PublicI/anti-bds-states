<template>
    <div class="basic-text">
        <!--<p class="chatter">The Center for Public Integrity reached out to all 50 states to ask if candidates running for state office may accept cryptocurrency. In total, {{responded.length-1}} states and D.C. responded.</p>-->

        <h4 style="padding-top: 0;margin-top: 0;margin-bottom: 0;font-size: 30px">{{apnumber(passed.length)}} states enacted measures discouraging boycotts of Israel</h4>
        <statebin :rows="passed" :labels="['Enacted']" :colors="['#f5e205']" />
    </div>
</template>

<script>
import Statebin from '~/components/Statebin.vue';
import { apnumber } from 'journalize';
import { csvParse } from 'd3';

export default {
    methods: {
        apnumber,
        capfirst(s) {
            s = s + '';
            return s.slice(0,1).toUpperCase() + s.slice(1);
        }
    },
    async asyncData({ app, error }) {
        const spreadsheetUrl =
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5E5RES-wb2wxjVXcUkpstaJNWIkYUl9Mr703Ek8yd8OUIHHvaIekAyEg0SXPJIz6JPokNlDHFshNs/pub?gid=0&single=true&output=csv';
        let csv = await app.$axios.$get(spreadsheetUrl);
        let rows = await csvParse(csv);

        return {
            passed: rows.filter(row => row['passed?'].toLowerCase().trim() === 'yes')
        };
    },
    components: {
        Statebin
    }
};
</script>

<style scoped>
h4 {
    max-width: 400px;
    line-height: 115%;
    padding-left: 8px;
}
.chatter {
    max-width: 400px;
    font-size: 15px;
    line-height: 130%;
    color: rgb(100,100,100);
    padding-left: 8px;
}
</style>
