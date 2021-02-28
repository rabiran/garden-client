import domainsMap from "../../api/domainsMap";
import config from "../../config";

const akaUIdDomainsMap = (uniqueId,domains) => {
    let lowerCaseUniqueId = uniqueId.split("@")[1].toLowerCase();
    const found = domainsMap.find(
      (el) => el[1].toLowerCase() === lowerCaseUniqueId
    );
    if (found === undefined) {
      return undefined;
    }
    if (found[0] === domains.ads) {
      return domains.ads;
    }
    if (found[0] === domains.es) {
      return domains.es;
    }
  };
  //
  const findakaOfUIdExcel = (currentUnit,domains) => {
    if (currentUnit === undefined) {
      return undefined;
    }
    const foundAdK = config.akaAdkatz.find(
      (el) => el.toLowerCase() === currentUnit.toLowerCase()
    );
    if (foundAdK !== undefined) {
      return domains.ads;
    }
    const foundKapaim = config.akaKapaim.find(
      (el) => el.toLowerCase() === currentUnit.toLowerCase()
    );
    if (foundKapaim !== undefined) {
      return domains.es;
    }
    return undefined;
  };

  const findPrimaryUIdByMail = (person) => {
    if (
      person === undefined ||
      person.mail === undefined ||
      person.domainUsers === undefined ||
      person.domainUsers.length === 0
    ) {
      return undefined;
    }
    let personMailLowCase = person.mail.toLowerCase();
    let foundObj = person.domainUsers.find(
      (el) => el.uniqueId.split("@")[0].toLowerCase() === personMailLowCase
    );
    if (foundObj === undefined) {
      return undefined;
    }
    return foundObj.uniqueId;
  };

  const findPrimaryUIdByMainAka = (person, mainAka,domains) => {
    if (
      person === undefined ||
      person.domainUsers === undefined ||
      person.domainUsers.length === 0
    ) {
      return undefined;
    }
    let primaryUIdByMail = findPrimaryUIdByMail(person);
    if (primaryUIdByMail !== undefined) {
      let akaDomainsMapMail = akaUIdDomainsMap(primaryUIdByMail,domains);
      if (akaDomainsMapMail === undefined || akaDomainsMapMail !== mainAka) {
        let foundObj = person.domainUsers.find(
          (el) => akaUIdDomainsMap(el.uniqueId,domains) === mainAka
        );
        if (foundObj !== undefined) {
          return foundObj.uniqueId;
        }
      }
      if (mainAka === akaDomainsMapMail) {
        return person.mail;
      }
    }
    let foundObjAka = person.domainUsers.find(
      (el) => akaUIdDomainsMap(el.uniqueId, domains) === mainAka
    );
    if (foundObjAka === undefined) {
      return person.domainUsers[0].uniqueId;
    }
    return foundObjAka.uniqueId;
  };
  const findPrimaryUniqueId = (person, dataSource,domains) => {
    if (
      person === undefined ||
      person.domainUsers === undefined ||
      person.domainUsers.length === 0
    ) {
      return undefined;
    }
    if (dataSource !== "ברירת מחדל" && dataSource !== "") {
      return findPrimaryUIdByMainAka(person, dataSource,domains);
    }
    let primaryUIdByMail = findPrimaryUIdByMail(person);
    if (primaryUIdByMail !== undefined) {
      return primaryUIdByMail;
    }
    let akaFromExcel = findakaOfUIdExcel(person.currentUnit, domains);
    if (akaFromExcel === undefined) {
      return person.domainUsers[0].uniqueId;
    }
    return findPrimaryUIdByMainAka(person, akaFromExcel ,domains);
  };

  export {akaUIdDomainsMap,findakaOfUIdExcel,findPrimaryUIdByMail,findPrimaryUIdByMainAka,findPrimaryUniqueId}