function PartnerInfo({ participants, email }) {
    // console.log({ participants, email }, "partnerInfo");
    return participants.find(participant => participant?.email !== email);
}

export default PartnerInfo;