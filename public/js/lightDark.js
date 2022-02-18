let d = new Date;
if (d.getHours() > 20) {
    document.getElementById('nav').classList.remove('bg-dark');
    document.getElementById('nav').classList.remove('text-light');
    document.getElementById('nav-link.active').classList.remove('text-light');
    document.getElementById('nav').classList.add('bg-light');
    document.getElementById('nav').classList.add('text-dark');
    console.log(d.getHours(), 'dark');
} else if (d.getHours() < 4) {
    document.getElementById('nav').classList.remove('bg-light');
    document.getElementById('nav').classList.remove('text-dark');
    document.getElementById('nav').classList.add('bg-dark');
    document.getElementById('nav').classList.add('text-light');
    document.getElementById('nav-link.active').classList.remove('text-primary');

    console.log(d.getHours(), 'light');
}