describe('factory: Search', function() {

  var search;
  var httpBackend;
  var items = [
    {
      "login": "tansaku",
      "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
      "html_url": "https://github.com/tansaku"
    },
    {
      "login": "ashleigh090990",
      "avatar_url": "https://avatars.githubusercontent.com/u/8567247?v=3",
      "html_url": "https://github.com/ashleigh090990"
    }
  ];

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(Search) {
    search = Search;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .expectGET("https://api.github.com/search/users?q=jellypants")
      .respond(
        { items: items }
      );
  }));

  it('responds to query', function() {
    expect(search.query).toBeDefined();
  });

  it('returns search results', function() {
    search.query('jellypants')
    .then(function(response) {
      expect(response.data).toEqual(items);
    });
  });
});