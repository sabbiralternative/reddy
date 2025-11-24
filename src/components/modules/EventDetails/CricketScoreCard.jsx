const CricketScoreCard = () => {
  return (
    <div className="widgets">
      <div>
        <div className="score-card cricket-score-card">
          <div>
            <div>
              <div style={{ marginBottom: "3px" }}>
                <div className="sc_cw-container-main">
                  <div className="sc_cw-row-ctm">
                    <div className="sc_cw-batsman_svg">
                      <img
                        src="https://speedcdn.io/assets/score_card/batsman-bold-outline.svg"
                        height="auto"
                        width="auto"
                        style={{ height: "100px !important" }}
                      />
                    </div>
                    <div
                      className="sc_cw-team"
                      style={{
                        textAlign: "right",
                        marginRight: "10px",
                        lineHeight: 2,
                      }}
                    >
                      <div className="sc_cw-curr_inn">
                        <div
                          style={{
                            lineHeight: "1.2",
                            fontWeight: 600,
                          }}
                        >
                          SA
                        </div>
                        <span className="run" style={{ fontWeight: 600 }}>
                          489/10&nbsp;
                        </span>
                        <span className="over" style={{ fontWeight: 600 }}>
                          (151.1)
                        </span>
                        <br />
                        <span className="over" style={{ fontWeight: 600 }}>
                          CRR :{" "}
                        </span>
                        3.23
                      </div>
                    </div>
                    <div
                      className="sc_cw-match_status"
                      style={{
                        border: "1px solid #fff !important",
                        borderRadius: "7px",
                        padding: "5px",
                      }}
                    >
                      <span className="sc_cw-commantry2">TEA BREAK</span>
                      <p
                        className="sc_cw-target"
                        style={{ fontStyle: "italic" }}
                      ></p>
                      <span className="sc_cw-day">
                        <div className="sc_cw-score-over">
                          <ul>
                            <li className="sc_cw-six-balls">0</li>
                            <li className="sc_cw-six-balls">0</li>
                            <li className="sc_cw-six-balls">w</li>
                            <li className="sc_cw-six-balls">0</li>
                            <li className="sc_cw-six-balls">0</li>
                            <li className="sc_cw-six-balls">0</li>
                          </ul>
                        </div>
                      </span>
                      <div
                        className="sc_cw-requiredRunRate"
                        style={{ fontWeight: 600 }}
                      >
                        <span style={{ fontWeight: 600 }}>
                          IND trail by 387 runs
                        </span>
                      </div>
                      <div className="sc_cw-batsman-container">
                        <div>
                          {" "}
                          <span>* Rishabh Pant</span> <span>6 (3)</span>{" "}
                        </div>
                        <div>
                          {" "}
                          <span>Ravindra Jadeja</span> <span>0 (3)</span>{" "}
                        </div>
                      </div>
                    </div>
                    <div
                      className="sc_cw-team"
                      style={{
                        textAlign: "left",
                        marginLeft: "10px",
                        lineHeight: 2,
                      }}
                    >
                      <div className="sc_cw-curr_inn">
                        <div
                          style={{
                            lineHeight: "1.2",
                            fontWeight: 600,
                          }}
                        >
                          IND
                        </div>
                        <span className="run" style={{ fontWeight: 600 }}>
                          102/4
                        </span>
                        <span className="over" style={{ fontWeight: 600 }}>
                          (36.0)
                        </span>
                        <br />
                        <span style={{ fontWeight: 600 }}>CRR: </span>
                        2.83
                      </div>
                    </div>
                    <div className="sc_cw-bowler_svg">
                      <img
                        src="https://speedcdn.io/assets/score_card/baller-bold-outline.svg"
                        height="auto"
                        width="auto"
                        style={{ height: "90px !important" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CricketScoreCard;
