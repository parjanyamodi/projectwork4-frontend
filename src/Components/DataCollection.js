import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import baseurl from "../baseurl";

import { values, suggestions } from "./values";

const DataCollection = (props) => {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [serumiron, setSerumiron] = useState(0);
  const [serumzinc, setSerumzinc] = useState(0);
  const [serumferritin, setSerumferritin] = useState(0);
  const [tsh, setTsh] = useState(0);
  const [dandruff, setDandruff] = useState(null);
  const [abnormalhairshaft, setAbnormalhairshaft] = useState(null);
  const [sistatus, setsistatus] = useState(null);
  const [sfstatus, setsfstatus] = useState(null);
  const [szstatus, setszstatus] = useState(null);
  const [tshstatus, settshstatus] = useState(null);
  useEffect(() => {
    fetch(`${baseurl}/data`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userInfo }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setName(data.data.Name);
          setAge(data.data.Age);
          setSerumferritin(data.data.SerumFerritin);
          setSerumiron(data.data.SerumIron);
          setSerumzinc(data.data.SerumZn);
          setTsh(data.data.TSH);
          setDandruff(data.data.Dandruff);
          setAbnormalhairshaft(data.data.AbnormalHairShaft);
          setGender(data.data.Gender);
          getReport();
        }
      });
  }, [userInfo]);
  const submitData = (e) => {
    e.preventDefault();
    fetch(`${baseurl}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo,
        name,
        age,
        Gender: gender,
        SerumFerritin: serumferritin,
        SerumIron: serumiron,
        SerumZn: serumzinc,
        TSH: tsh,
        AbnormalHairShaft: abnormalhairshaft,
        Dandruff: dandruff,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setName(data.data.Name);
          setAge(data.data.Age);
          setSerumferritin(data.data.SerumFerritin);
          setSerumiron(data.data.SerumIron);
          setSerumzinc(data.data.SerumZn);
          setTsh(data.data.TSH);
          setDandruff(data.data.Dandruff);
          setAbnormalhairshaft(data.data.AbnormalHairShaft);
          setGender(data.data.Gender);
          getReport();
        }
      });
    getReport();
  };
  const getReport = () => {
    if (gender === "M") {
      if (serumzinc < 60) {
        setszstatus("isless");
      } else if (serumzinc > 120) {
        setszstatus("ismore");
      } else {
        setszstatus("normal");
      }
      if (serumiron < 80) {
        setsistatus("isless");
      } else if (serumiron > 180) {
        setsistatus("ismore");
      } else {
        setsistatus("normal");
      }
      if (serumferritin < 20) {
        setsfstatus("isless");
      } else if (serumferritin > 250) {
        setsfstatus("ismore");
      } else {
        setsfstatus("normal");
      }
      if (tsh < 0.5) {
        settshstatus("isless");
      } else if (tsh > 5.0) {
        settshstatus("ismore");
      } else {
        settshstatus("normal");
      }
    } else if (gender === "F") {
      if (serumzinc < 60) {
        setszstatus("isless");
      } else if (serumzinc > 120) {
        setszstatus("ismore");
      } else {
        setszstatus("normal");
      }
      if (serumiron < 60) {
        setsistatus("isless");
      } else if (serumiron > 160) {
        setsistatus("ismore");
      } else {
        setsistatus("normal");
      }
      if (serumferritin < 10) {
        setsfstatus("isless");
      } else if (serumferritin > 120) {
        setsfstatus("ismore");
      } else {
        setsfstatus("normal");
      }
      if (tsh < 0.5) {
        settshstatus("isless");
      } else if (tsh > 5.0) {
        settshstatus("ismore");
      } else {
        settshstatus("normal");
      }
    } else {
    }
  };
  if (userInfo) {
    return (
      <div className="container min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5">
            <div className="card mt-5">
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-12 justify-content-center">
                    <h1 className="text-white">Enter Data</h1>
                    <form
                      className="justify-content-center"
                      onSubmit={submitData}
                    >
                      <div className="col-12">
                        <div className="form-group text-start text-white">
                          <div className="row justify-content-center">
                            <div className="col-md-6 col-12 mt-3">
                              <label htmlFor="name">Name</label>
                              <input
                                type="text"
                                className="form-control input"
                                id="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="col-md-6 col-12 mt-3">
                              <label htmlFor="age">Age</label>
                              <input
                                type="number"
                                className="form-control input"
                                id="age"
                                placeholder="Enter age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                              />
                            </div>
                            <div className="col-md-6 col-12 mt-3">
                              <label htmlFor="gender">Gender</label>
                              <select
                                id="gender"
                                placeholder="Select Gender"
                                className="form-control input"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                              >
                                <option value={"Choose One"} selected required>
                                  Choose One ...
                                </option>
                                <option value={"M"}>Male</option>
                                <option value={"F"}>Female</option>
                              </select>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-md-4 col-12 mt-3">
                              <label htmlFor="serumiron">Serum Iron</label>
                              <input
                                type="number"
                                className="form-control input"
                                id="serumiron"
                                step={"any"}
                                placeholder="Enter serum iron"
                                value={serumiron}
                                onChange={(e) => setSerumiron(e.target.value)}
                              />
                            </div>
                            <div className="col-md-4 col-12 mt-3">
                              <label htmlFor="serumzinc">Serum Zinc</label>
                              <input
                                type="number"
                                className="form-control input"
                                id="serumzinc"
                                step={"any"}
                                placeholder="Enter serum zinc"
                                value={serumzinc}
                                onChange={(e) => setSerumzinc(e.target.value)}
                              />
                            </div>
                            <div className="col-md-4 col-12 mt-3">
                              <label htmlFor="serumferritin">
                                Serum Ferritin
                              </label>
                              <input
                                type="number"
                                className="form-control input"
                                id="serumferritin"
                                step={"any"}
                                placeholder="Enter serum ferritin"
                                value={serumferritin}
                                onChange={(e) =>
                                  setSerumferritin(e.target.value)
                                }
                              />
                            </div>
                            <div className="col-md-4 col-12 mt-3">
                              <label htmlFor="tsh">TSH</label>
                              <input
                                type="number"
                                className="form-control input"
                                id="tsh"
                                step={"any"}
                                placeholder="Enter TSH"
                                value={tsh}
                                onChange={(e) => setTsh(e.target.value)}
                              />
                            </div>
                            <div className="col-md-4 col-12 mt-3">
                              <label htmlFor="dandruff">
                                Do you have Dandruff?
                              </label>
                              <select
                                id="dandruff"
                                className="form-control input"
                                value={dandruff}
                                onChange={(e) => setDandruff(e.target.value)}
                              >
                                <option value={null} selected disabled>
                                  Choose One ...
                                </option>
                                <option value={"1"}>Yes</option>
                                <option value={"0"}>No</option>
                              </select>
                            </div>
                            <div className="col-md-4 col-12 mt-3">
                              <label htmlFor="abnormalhairshaft">
                                Do you have Abnormal Hair Shaft?
                              </label>
                              <select
                                id="abnormalhairshaft"
                                className="form-control input"
                                value={abnormalhairshaft}
                                onChange={(e) =>
                                  setAbnormalhairshaft(e.target.value)
                                }
                              >
                                <option value={null} selected disabled>
                                  Choose One ...
                                </option>
                                <option value={"1"}>Yes</option>
                                <option value={"0"}>No</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-primary mt-3">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mb-5">
            <div className="row justify-content-center mt-5">
              <div className="col-12 mt-3">
                <div className="card">
                  <div className="card-body">
                    <h1 className="text-white">Results</h1>
                    <div className="row justify-content-center">
                      <div className="col-12 mt-3"></div>
                      {sistatus === "isless" ? (
                        <div className="col-md-6 mt-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="card-title text-white">
                                <h3>Improve iron levels</h3>
                              </div>
                              <div className="card-body text-start text-white">
                                <p>
                                  Dark-green leafy vegetables like watercress
                                  and curly kale.
                                  <br />
                                  Cereals and bread with extra iron in them
                                  (fortified)
                                  <br />
                                  Meat.
                                  <br />
                                  Dried fruit like apricots, prunes and
                                  raisins.Pulses (beans, peas and lentils)
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : sistatus === "ismore" ? (
                        <div className="col-md-6 mt-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="card-title text-white">
                                <h3>Reduce Iron levels</h3>
                              </div>
                              <div className="card-body text-start text-white">
                                <p>
                                  Avoiding supplements that contain iron.
                                  <br /> Avoiding supplements that contain
                                  vitamin C, as this vitamin increases iron
                                  absorption.
                                  <br /> Reducing iron-rich and iron-fortified
                                  foods. avoiding uncooked fish and shellfish.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {sfstatus === "isless" ? (
                        <div className="col-md-6 mt-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="card-title text-white">
                                <h3>Improve Ferritin levels</h3>
                              </div>
                              <div className="card-body text-start text-white">
                                <p>
                                  Dark-green leafy vegetables like watercress
                                  and curly kale.
                                  <br />
                                  Cereals and bread with extra iron in them
                                  (fortified)
                                  <br />
                                  Meat.
                                  <br />
                                  Dried fruit like apricots, prunes and
                                  raisins.Pulses (beans, peas and lentils)
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : sfstatus === "ismore" ? (
                        <div className="col-md-6 mt-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="card-title text-white">
                                <h3>Reduce Ferritin levels</h3>
                              </div>
                              <div className="card-body text-start text-white">
                                <p>
                                  Avoiding supplements that contain iron.
                                  <br /> Avoiding supplements that contain
                                  vitamin C, as this vitamin increases iron
                                  absorption.
                                  <br /> Reducing iron-rich and iron-fortified
                                  foods. avoiding uncooked fish and shellfish.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {szstatus === "isless" ? (
                        <div className="col-md-6 mt-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="card-title text-white">
                                <h3>Improve Zinc levels</h3>
                              </div>
                              <div className="card-body text-start text-white">
                                <p>
                                  Meat. Meat is an excellent source of zinc
                                  <br />
                                  Shellfish. Shellfish are healthy, low-calorie
                                  sources of zinc
                                  <br />
                                  Legumes. Legumes like chickpeas, lentils and
                                  beans all contain substantial amounts of zinc.{" "}
                                  <br />
                                  Seeds. Seeds are a healthy addition to your
                                  diet and can help increase your zinc intake.{" "}
                                  <br />
                                  Nuts. <br />
                                  Dairy. <br />
                                  Eggs. <br />
                                  Whole Grains.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : szstatus === "ismore" ? (
                        <div className="col-md-6 mt-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="card-title text-white">
                                <h3>Reduce Zinc Levels</h3>
                              </div>
                              <div className="card-body text-start text-white">
                                <p>
                                  The calcium and phosphorus in the milk can
                                  help bind the excess zinc and prevent the
                                  stomach and intestines from absorbing it.
                                  <br /> Chelation is a process that removes
                                  excess metals, such as zinc, copper, or lead,
                                  from the body.
                                  <br /> During this treatment, a doctor gives
                                  the person a drug that helps bind the excess
                                  zinc and remove it from the body through the
                                  urine.
                                  <br /> This removal prevents the body from
                                  absorbing zinc or other metals, which could
                                  cause further damage.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {tshstatus === "isless" ? (
                        <div className="col-md-6 mt-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="card-title text-white">
                                <h3>Improve TSH levels</h3>
                              </div>
                              <div className="card-body text-start text-white">
                                <p>
                                  Exercise
                                  <br /> Iodine
                                  <br /> A healthy and balanced diet consisting
                                  of whole grains, seafood, good amounts of high
                                  quality protein and fiber can help raise TSH
                                  levels naturally.
                                  <br /> The mineral, selenium plays an
                                  important role in thyroid activity.
                                  <br /> Hence selenium rich foods like fish,
                                  shrimp, garlic, crimini mushrooms, Mozzarella
                                  cheese, asparagus, mustard, Brazil nuts, oats,
                                  eggs, brown rice, chicken breast, beef
                                  tenderloin, calf’s liver, should be included
                                  in the regular diet.
                                  <br />
                                  Consumption of low glycemic foods helps
                                  control blood sugar levels.
                                  <br /> Stable blood sugar levels promote
                                  proper functioning of the glands in the body.
                                  <br /> Certain foods and supplements can
                                  worsen the situation.
                                  <br /> Avoid refined carbohydrates which lead
                                  to weight gain. <br />
                                  Consult your physician before opting for any
                                  supplement.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : tshstatus === "ismore" ? (
                        <div className="col-md-6 mt-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="card-title text-white">
                                <h3>Reduce TSH levels</h3>
                              </div>
                              <div className="card-body text-start text-white">
                                <p>
                                  The diet should only consist of freshly cooked
                                  food.
                                  <br /> Include lots of vitamin B-rich foods
                                  like nuts and seeds.
                                  <br /> Drinking plenty of water, and including
                                  salt high in iodine will also benefit.
                                  <br /> Avoid the consumption of alcohol and
                                  also avoid smoking.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  window.location.replace("/login");
};
export default DataCollection;
