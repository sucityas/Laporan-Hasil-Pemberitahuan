import React, { useContext, useEffect, useRef } from "react";
import { get, isEmpty } from "lodash";
import usePromiseAll from "utils/perbaikan-module/api/usePromiseAll";
import Page from "./page";
import { store } from "utils/perbaikan-module/context/store";

/** Role User SingleCore
 * IMPORTIR
 * EKSPORTIR
 * TPB
 * PLB
 * IMPORTIR PLB
 * EKSPORTIR PLB
 * PPJK
 */
function RoleUser({ children, dataUser = {} }) {
  const npwp = dataUser.npwp || "";
  const refTemp = useRef({ fasilitas: [], regis: {} });
  const [res, fetch] = usePromiseAll();
  const context = useContext(store);
  const { dispatch } = context;

  // REACT STATE
  const [loading, setLoading] = React.useState(true);

  useEffect(getApi, []);
  function getApi() {
    setLoading(true);
    dispatch({ type: "SET", payload: { dataUser } });
    fetch([
      {
        url: `${process.env.REACT_APP_SCE_WS}/profil/perusahaan/regis-header-by-npwp?npwp=${npwp}`,
      },
      {
        url: `${process.env.REACT_APP_SCE_WS}/profil/perusahaan/get-fasilitas-by-npwp?npwp=${npwp}`,
      },
      {
        url: `${process.env.REACT_APP_REFERENSI}/v1/Nib4/${npwp?.substring(
          0,
          9
        )}`,
      },
    ]);
  }

  useEffect(apiHandler, [res.data]);
  function apiHandler() {
    if (!isEmpty(res.data)) {
      const regis = get(res.data[0], "data", {});
      refTemp.current = { ...refTemp.current, regis };
      const fasilitas = get(res.data[1], "data", []);
      refTemp.current = { ...refTemp.current, fasilitas };
      const nib4 = get(res.data[2], "data.data[0]", {});
      refTemp.current = { ...refTemp.current, nib4 };
      filterRole();
    }
  }

  function filterRole() {
    let role = [];

    if (["123456789012345"].indexOf(npwp) !== -1) {
      role = [
        "IMPORTIR",
        "EKSPORTIR",
        "TPB",
        "PLB",
        "IMPORTIR PLB",
        "EKSPORTIR PLB",
        "FTZ",
        "PPJK",
      ];
    } else {
      const regis = refTemp.current.regis;
      const nib4 = refTemp.current.nib4;
      if (regis.flagImpor || nib4.flagImpor === "Y") role.push("IMPORTIR");
      if (regis.flagEkspor || nib4.flagEkspor === "Y") role.push("EKSPORTIR");
      if (regis.flagPpjk) role.push("PPJK");

      const fasilitas = refTemp.current.fasilitas;
      console.log("role pengguna", { regis, nib4, fasilitas });
      const flagTBP = fasilitas.findIndex((e) => e.kodeSkep === "TPB");
      if (flagTBP !== -1) role.push("TPB");

      const JenisPlb = fasilitas.filter((e) => e.kodeSkep === "PLB");
      const flagPLB = JenisPlb.findIndex(
        (e) =>
          e.kodeJenisPlb === 1 ||
          e.kodeJenisPlb === 2 ||
          e.kodeJenisPlb === 3 ||
          e.kodeJenisPlb === 4
      );
      if (flagPLB !== -1) role.push("PLB");

      const flagImporPLB = JenisPlb.findIndex((e) => e.kodeJenisPlb === 5);
      if (flagImporPLB !== -1) role.push("IMPORTIR PLB");

      const flagEksporPLB = JenisPlb.findIndex((e) => e.kodeJenisPlb === 6);
      if (flagEksporPLB !== -1) role.push("EKSPORTIR PLB");
    }
    dispatch({ type: "SET", payload: { role } });
    setLoading(false);
  }

  return (
    <Page loading={res.loading} error={res.error} onReload={() => getApi()}>
      {!loading ? children : null}
    </Page>
  );
}

export default RoleUser;
