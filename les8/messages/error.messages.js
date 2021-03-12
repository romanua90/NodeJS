module.exports = {
    BAD_REQUEST: {
        customCode: 4000
    },
    JOI_VALIDATION_ERROR: {
        customCode: 4001
    },
    WRONG_EMAIL: {
        en: 'Wrong email',
        ua: 'Неправильний email',
        de: 'Email ist falsch'
    },
    USER_NOT_CREATED: {
        en: 'User is not created',
        ua: 'Користувача не створено',
        de: 'Benutzer wurde nicht erstellt'
    },
    USER_CREATED: {
        en: 'User is created',
        ua: 'Користувача створено',
        de: 'Benutzer wurde erstellt'
    },
    USER_NOT_FOUND: {
        en: 'User is not found',
        ua: 'Користувача не знайдено',
        de: 'Benutzer wurde nicht gefunden'
    },
    USER_IS_EXIST: {
        en: 'User is already exist',
        ua: 'Користувач вже існує',
        de: 'Benutzer bereits existiert'
    },
    USER_DELETED: {
        en: 'User was deleted',
        ua: 'Користувача видалено',
        de: 'Benutzer wurde geloescht'
    },
    AGE_IS_INVALID: {
        en: 'Your age is invalid',
        ua: 'Твій вік недійсний',
        de: 'Ihr Benutzeralter ist ungültig'
    },
    TOO_OLD: {
        en: 'Your age is too big',
        ua: 'Твій вік занадто великий',
        de: 'hr Benutzeralter ist zu gross'
    },
    ID_IS_INVALID: {
        en: 'Your user ID is invalid',
        ua: 'Твій ID не валідний',
        de: 'Dein ID ist nicht ungültig'
    },
    ABSENT_FIELDS: {
        en: 'Request do not have some fields',
        ua: 'У запиті відсутні деякі поля',
        de: 'Anfrage haben keine Felder'
    },
    TOO_SHORT_FIRST_NAME: {
        en: 'Too shor first name - must be at least 3 symbols',
        ua: 'В тебе занадто коротке імя користувача - має бути як мінімум 3 символів',
        de: 'Zu kurze Vorname - muss mindestens 7 Symbole enthalten'
    },
    TOO_SHORT_LAST_NAME: {
        en: 'Too shor last name - must be at least 7 symbols',
        ua: 'В тебе занадто коротке призвище користувача - мінімум 7 символів',
        de: 'Zu kurze Nachname - muss mindestens 7 Symbole enthalten'
    },
    NO_RESULT_FOUND: {
        en: 'Search on database have no results',
        ua: 'Пошук по базі даних не мав результату',
        de: 'Datenbanksuche hat keine Ergebnisse zurückgegeben'
    },
    ABSENT_ACCESS_TOKEN: {
        en: 'Your request doesnt have access token',
        ua: 'У Вашому запиті відсутній маркер доступу',
        de: 'In Ihrer Anfrage fehlt ein Zugriffstoken'
    },
    ACCESS_TOKEN_NOT_VALID: {
        en: 'Your access token is not valid',
        ua: 'Твій маркер доступу не валідний',
        de: 'Ihr Zugriffstoken ist ungültig '
    },
    SUSPICIOUS_TOKEN: {
        en: 'Your access token doesnt exist in database',
        ua: 'Твій маркер доступу відсутній у базі даних',
        de: 'Ihr Zugriffstoken befindet sich nicht in der Datenbank'
    },
    ABSENT_REFRESH_TOKEN: {
        en: 'Your request doesnt have refresh token',
        ua: 'У Вашому запиті відсутній маркер оновлення',
        de: 'In Ihrer Anfrage fehlt ein Aktualisierungstoken '
    },
    REFRESH_TOKEN_NOT_VALID: {
        en: 'Your refresh token is not valid',
        ua: 'Твій маркер оновлення не валідний',
        de: 'Ihr Update-Token ist ungültig '
    },
    UNAUTHORISED_ACCESS: {
        en: 'Unauthorised access attempt to user data',
        ua: 'Неавторізована спроба доступу до даних користувача',
        de: 'Nicht autorisierter Versuch, auf Benutzerdaten zuzugreifen '
    }
};
