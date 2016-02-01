module.exports = {
    template: require('./template.html'),
    props: {
        itemsTotal: {
            type: Number,
            required: true
        },
        itemsPerPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        pagesTotal: function () {
            var vm = this;
            return Math.ceil(vm.itemsTotal / vm.itemsPerPage);
        }
    },
    methods: {
        setPage: function (pageNumber) {
            var vm = this;

            if (pageNumber < 0) {
                vm.currentPage = 0;
            }

            if (pageNumber > vm.pagesTotal - 1) {
                vm.currentPage = vm.pagesTotal - 1;
            }

            if (0 <= pageNumber && pageNumber <= vm.pagesTotal - 1) {
                vm.currentPage = pageNumber;
            }
        },
        isShow: function (pageNumber) {
            var vm = this;
            var distanceFromCurrent = Math.abs(pageNumber - vm.currentPage);
            var distanceFromFirst = pageNumber - 0;
            var distanceFromLast = vm.pagesTotal - 1 - pageNumber;

            if (vm.currentPage < 3 && distanceFromFirst < 5) {
                return true;
            }

            if ((vm.currentPage > vm.pagesTotal - 3) && (distanceFromLast < 5)) {
                return true;
            }

            if ((3 <= vm.currentPage && vm.currentPage <= vm.pagesTotal -3) && (distanceFromCurrent < 3)) {
                return true;
            }

            return false;
        }
    }
};