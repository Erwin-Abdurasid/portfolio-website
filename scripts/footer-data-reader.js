function read_and_populate_footer_data() {
    let url = 'raw-data/data/footer-data.json';

    const address = document.querySelector('.email a');
    const social_anc = document.querySelectorAll('.social-icons a');
    const social_img = document.querySelectorAll('.social-icons img');
    const copyright = document.querySelector('footer > p.text-center');

    let from_sub = social_img[0].getAttribute('from-sub');
    if (from_sub === 'true') {
        url = '../raw-data/data/footer-data.json';
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            address.textContent = data.address;
            address.setAttribute('href', `mailto:${data.address}`);

            for (let i = 0; i < data.social_medias.length; i++) {
                social_anc[i].setAttribute('href', data.social_medias[i].url);

                if (from_sub === 'true') {
                    social_img[i].setAttribute('src', `../${data.social_medias[i].img}`);
                } else {
                    social_img[i].setAttribute('src', data.social_medias[i].img);
                }
            }

            copyright.innerHTML = `${data.begin_year} &copy; ${data.current_year}`;
        })
        .catch(error => console.error(error));
}

read_and_populate_footer_data();
