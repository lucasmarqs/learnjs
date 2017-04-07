describe("LearnJS", function () {
  console.log("describe a spec");

  it("can show a problem view", function () {
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });
});
