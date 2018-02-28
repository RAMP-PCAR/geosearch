describe("The data cache contains", function() {
    it("a province file (provinces.js) with a {province code: province name} object for both English and French", function() {
        expect(this.data_provinces).toEqual(jasmine.objectContaining(this.geogratis_provinces));
    });

    it("a type file (types.js) with a {type code: type name} object for both English and French", function() {
        expect(this.data_types).toEqual(jasmine.objectContaining(this.geogratis_types));
    });
});