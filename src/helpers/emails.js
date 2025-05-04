import emailjs from "@emailjs/browser";

const _status = {
    didInit: false,
    config: null
}

export const useEmails = () => {
    /**
     * @param {Object} config
     */
    const init = (config) => {
        emailjs.init(config.publicKey)
        _status.config = config
        _status.didInit = true
    }

    /**
     * @return {boolean}
     */
    const isInitialized = () => {
        return _status.didInit
    }

    /**
     * @param {string} fromName
     * @param {string} fromEmail
     * @param {string} customSubject
     * @param {string }message
     * @return {Promise<boolean>|Boolean}
     */
    const sendContactEmail = async (fromName, fromEmail, customSubject, message) => {
        if(!isInitialized())
            return

        const params = {
            from_name: fromName,
            from_email: fromEmail,
            custom_subject: customSubject,
            message: message
        }

        try {
            const response = await emailjs.send(
                _status.config['serviceId'],
                _status.config['templateId'],
                params
            )
            return true
        } catch (error) {
            return false
        }
    }

    return {
        init,
        isInitialized,
        sendContactEmail
    }
}