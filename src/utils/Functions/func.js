import domainsMaps from "../../api/domainsMaps";
import config from "../../config";


/**
 * This function searches domain of the uniqueID in domainsMaps array that belongs to one of the domains listed.
 * @param {string} uniqueID 
 * @param {object} domains 
 * @param {[][]} domainsMap 
 * @returns the special domain it belongs, else undefined.
 */
const akaUIdDomainsMap = (uniqueID, domains , domainsMap = domainsMaps) => {
  console.log(uniqueID)
  let lowerCaseUniqueId = uniqueID.split("@")[1].toLowerCase();
  const found = domainsMap.find(
    (el) => el[0].toLowerCase() === lowerCaseUniqueId
  );
  if (found === undefined) {
    return undefined;
  }
  let adsRow = domainsMap.find((el)=> el[0] === domains.ads);
  if(adsRow !== undefined){
      adsRow = adsRow[1]
  }
  if (found[1] === adsRow) { //adsrow//doamins.ads
    return domains.ads;
  }
  if (found[1] === domains.es) {
    return domains.es;
  }
  return undefined;
};

/**
 * This function finds the current unit in the two arrays of the domains.
 * @param {string} currentUnit 
 * @param {object} domains 
 * @param {[]} akaAdkatz 
 * @param {[]} akaKapaim 
 * @returns the special domain the current unit belongs, else undefined.
 */
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

/**
 * This function checks if mail exists in one of the persons domain users.
 * @param {object} person 
 * @returns The unique id of the domain user found, else undefined.
 */
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

/**
 * This function searches  for the primary unqiue id by the chosen main aka unit(data source),
 * by prioritizing the mail as PrimaryUID, then first unique id that matches, else first in array
 * @param {object} person person object
 * @param {string} mainAka main domain for primary unique id
 * @param {object} domains the primary domains
 * @param {[][]} domainsMap 2d domains map array
 * @returns The preffered unique id by chosen main aka unit.
 */ 
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

/**
 * This function searches for PrimaryUID of a person,
 * searches the PUID by the main data source if the function triggered by group search adding,
 * then by the primary mail of the person, then by the current unit, else returns first cell.
 * @param {object} person 
 * @param {string} dataSource 
 * @param {object} domains 
 * @param {object} excel 
 * @param {[][]} domainsMap 
 * @returns Primary unique id of the person.
 */
const findPrimaryUniqueId = (person, dataSource, domains,excel,domainsMap ) => {
  console.log(person);
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
