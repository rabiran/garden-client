import domainsMaps from "../../api/domainsMaps";
import config from "../../config";

const akaUIdDomainsMap = (uniqueID, domains , domainsMap = domainsMaps) => {
  let lowerCaseUniqueId = uniqueID.split("@")[1].toLowerCase();
  const found = domainsMap.find(
    (el) => el[0].toLowerCase() === lowerCaseUniqueId
  );
  if (found === undefined) {
    return undefined;
  }
  let adsRow = domainsMap.find((el)=> el[0].toLowerCase() === domains.ads.toLowerCase());
  if(adsRow !== undefined){
      adsRow = adsRow[1]
  }
  if (found[1] === adsRow) {
    return domains.ads;
  }
  if (found[1] === domains.es) {
    return domains.es;
  }
  return undefined;
};
//
const findakaOfUIdExcel = (currentUnit, domains, akaAdkatz = config.akaAdkatz, akaKapaim = config.akaKapaim) => {

  if (currentUnit === undefined) {
    return undefined;
  }
  const foundAdK = akaAdkatz.find(
    (el) => el.toLowerCase() === currentUnit.toLowerCase()
  );
  if (foundAdK !== undefined) {
    return domains.ads;
  }
  const foundKapaim = akaKapaim.find(
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
    (el) => el.uniqueID.split("@")[0].toLowerCase() === personMailLowCase
  );
  if (foundObj === undefined) {
    return undefined;
  }
  return foundObj.uniqueID;
};

const findPrimaryUIdByMainAka = (person, mainAka, domains, domainsMap) => {
  if (
    person === undefined ||
    person.domainUsers === undefined ||
    person.domainUsers.length === 0
  ) {
    return undefined;
  }
  let primaryUIdByMail = findPrimaryUIdByMail(person);
  if (primaryUIdByMail !== undefined) {
    let akaDomainsMapMail = akaUIdDomainsMap(primaryUIdByMail, domains , domainsMap);
    if (akaDomainsMapMail === undefined || akaDomainsMapMail !== mainAka) {
      let foundObj = person.domainUsers.find(
        (el) => akaUIdDomainsMap(el.uniqueID, domains, domainsMap) === mainAka
      );
      if (foundObj !== undefined) {
        return foundObj.uniqueID;
      }
    }
    if (mainAka === akaDomainsMapMail) {
      return person.mail;
    }
  }
  let foundObjAka = person.domainUsers.find(
    (el) => akaUIdDomainsMap(el.uniqueID, domains, domainsMap) === mainAka
  );
  if (foundObjAka === undefined) {
    return person.domainUsers[0].uniqueID;
  }
  return foundObjAka.uniqueID;
};
const findPrimaryUniqueId = (person, dataSource, domains,excel,domainsMap ) => {
  if (
    person === undefined ||
    person.domainUsers === undefined ||
    person.domainUsers.length === 0
  ) {
    return undefined;
  }
  if (dataSource !== "ברירת מחדל" && dataSource !== "") {
    return findPrimaryUIdByMainAka(person, dataSource, domains , domainsMap);
  }
  let primaryUIdByMail = findPrimaryUIdByMail(person);
  if (primaryUIdByMail !== undefined) {
    return primaryUIdByMail;
  }
  let akaFromExcel = findakaOfUIdExcel(person.currentUnit, domains,excel.akaAdkatz, excel.akaKapaim);
  if (akaFromExcel === undefined) {
    return person.domainUsers[0].uniqueID;
  }
  return findPrimaryUIdByMainAka(person, akaFromExcel, domains, domainsMap);
};

export {
  akaUIdDomainsMap,
  findakaOfUIdExcel,
  findPrimaryUIdByMail,
  findPrimaryUIdByMainAka,
  findPrimaryUniqueId,
};
