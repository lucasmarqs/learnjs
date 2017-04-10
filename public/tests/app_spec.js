describe('LearnJS', function () {
  it('can show a problem view', function () {
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });

  it('shows the landing page view when there is no hash', function () {
    learnjs.showView('');
    expect($('.view-container .landing-view').length).toEqual(1);
  });

  it('passes the hash view parameter to the view function', function () {
    spyOn(learnjs, 'problemView');
    learnjs.showView('#problem-42');
    expect(learnjs.problemView).toHaveBeenCalledWith('42');
  });

  it('invokes the router when loaded', function () {
    spyOn(learnjs, 'showView');
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  it('subscribes to the hash change event', function () {
    learnjs.appOnReady();
    spyOn(learnjs, 'showView');
    $(window).trigger('hashchange');
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  describe('problem view', function () {
    it('has a title that includes the problem number', function () {
      var view = learnjs.problemView('1');
      expect(view.find('.title').text()).toEqual('Problem #1');
    });

    it('invokes the applyObject function', function () {
      spyOn(learnjs, 'applyObject');
      learnjs.problemView('1');
      expect(learnjs.applyObject).toHaveBeenCalled();
    });
  });

  describe('apply object', function () {
    it('populates element text given the object', function () {
      var elem = learnjs.template('problem-view');
      var obj = learnjs.problems[0];
      learnjs.applyObject(obj, elem);

      expect(elem.find('[data-name=description]').text()).toEqual(obj.description);
      expect(elem.find('[data-name=code]').text()).toEqual(obj.code);
    });
  });

  describe('answer section', function () {
    var view;

    beforeEach(function () {
      view = learnjs.problemView('1');
    });

    it('can check a correct answer by hitting a button', function () {
      spyOn(learnjs, 'buildCorrectFlash');
      view.find('.answer').val('true');
      view.find('.check-btn').click();
      expect(learnjs.buildCorrectFlash).toHaveBeenCalledWith(1)
    });

    it('rejects an incorrect answer', function () {
      view.find('.answer').val('false');
      view.find('.check-btn').click();
      expect(view.find('.result').text()).toEqual('Incorrect!');
    });
  });

  describe('build correct flash', function () {
    it('creates a link to next problem', function () {
      var view = learnjs.buildCorrectFlash(1);
      var link = view.find('a');

      expect(link.attr('href')).toEqual('#problem-2');
    });

    it('can finish the game', function () {
      var view = learnjs.buildCorrectFlash(learnjs.problems.length);
      var link = view.find('a');

      expect(link.attr('href')).toEqual('#');
      expect(link.text()).toEqual("You're Finished!");
    });
  });
});
