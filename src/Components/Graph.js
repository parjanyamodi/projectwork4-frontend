const Graph = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="container min-vh-100">
      <div className="row">
        <div className="col-12">
          <div className="row justify-content-center">
            {arr.map((i) => {
              return (
                <div className="col-md-6 mb-4">
                  <div className="card  h-100">
                    <div className="card-body">
                      <img src={`/imgs/` + i + `.png`} className="graph" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row justify-content-center">
            <div className="col-12 mt-4 mb-5">
              <div className="card">
                <div className="card-body">
                  <img src={`/imgs/10.png`} className="bigGraph" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Graph;
