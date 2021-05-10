
module.exports = class Pagination {
    constructor (api, render){
        this.api = api;
        this.nextChunk(render);
    }

    nextChunk(render){
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.api.CURPAGE += 1;
            render();
        });
    }
}