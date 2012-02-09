IWitness.searchController = Ember.Object.create({
  searching:         false,
  searchSubmitted:   false,
  contentBinding:    'IWitness.searchCriteria',

  search: function() {
    this.set('searchSubmitted', true);

    if (!this.getPath('content.isValid')) return;

    IWitness.resultSetController.clearResults();
    this.set('searching', true);

    var params = IWitness.searchCriteria.searchParams();
    var search = new TwitterSearch(params);
    var self   = this;

    search.bind('data', function(results){
      IWitness.resultSetController.pushTwitterResults(results);
    });

    search.bind('done', function() {
      self.set('searching', false);
    });

    search.fetch(100);
  }
});
