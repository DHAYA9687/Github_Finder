$(document).ready(function () {
  $("#search").hover(
    function (e) {
      $("#search").css("background-color", "#f2f2f2");
    },
    function (e) {
      $("#search").css("background-color", "white");
    }
  );
  $("#search").on("keyup", function (e) {
    var username = e.target.value;
    console.log(username);

    $.ajax({
      url: "https://api.github.com/users/" + username,
      headers: {
        Authorization: "token " + token,
      },
    }).done(function (user) {
      $.ajax({
        url: "https://api.github.com/users/" + username + "/repos",
        headers: {
          Authorization: "token " + token,
        },
        data: {
          sort: "created: asc",
          per_page: 5,
        },
      }).done(function (repos) {
        $.each(repos, function (index, repo) {
          $("#repos").append(`
            <div class="bg-gray-100 p-4 mb-4 rounded-lg">
              <p class="font-bold text-xl">${repo.name}</p>
              <p>${repo.description}</p>
              <div class="mt-2 flex items-center">
                <p class="mr-4 bg-red-600 px-6 py-2 m-2  rounded-md text-white hover:bg-red-700">Forks: ${repo.forks_count}</p>
                <p class="mr-4 bg-green-500 px-6 py-2 m-2  rounded-md text-white hover:bg-green-700">Watchers: ${repo.watchers_count}</p>
                <p class="mr-4 bg-blue-400 px-6 py-2 m-2  rounded-md text-white hover:bg-blue-600">Stars: ${repo.stargazers_count}</p>
                <div class="bg-gray-800 px-6 py-2 m-2  rounded-md text-white hover:bg-gray-600">
                   <a href="${repo.html_url}" target="_blank" class="">Repo</a>
                 </div>
              </div>
            </div>
                `);
        });
      });

      $("#profile").html(`
  <div class="mx-auto w-full sm:w-5/6 lg:w-4/6 mt-10">
  <div class="border-2 ">
    <div class="border-b-2">
      <p class="font-semibold   p-4">${user.name}</p>
    </div>
    <div class="flex p-4">
      <div class="flex-40 p-4">
        <div class="flex flex-col justify-center">
          <div>
            <img
              src="${user.avatar_url}"
              alt="User Avatar"
              class="h-48 w-full object-cover rounded-full border-2 p-1"
            />
          </div>
          <div class="flex justify-center m-1 bg-red-600 rounded-xl text-white hover:bg-red-700 p-2">
            <a
              href="${user.html_url}"
              target="_blank"
              class="uppercase tracking-wide text-sm font-semibold"
              >View Profile</a
            >
          </div>
        </div>
      </div>
      <div class="flex-60 pt-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:pr-1 md:pr-3">
          <div class="bg-black text-white rounded-md text-center p-3">
            <p class="font-semibold">Public Repos: ${user.public_repos}</p>
          </div>
          <div class="bg-red-600 text-white rounded-md text-center p-3">
            <p class="font-semibold">Public Gists: ${user.public_gists}</p>
          </div>
          <div class="bg-green-500 text-white rounded-md text-center p-3">
            <p class="font-semibold">Followers: ${user.followers}</p>
          </div>
          <div class="bg-blue-400 text-white rounded-md text-center p-3">
            <p class="font-semibold">Following: ${user.following}</p>
          </div>
        </div>
        <div class="flex flex-col border-2 p-4 m-4 items-start justify-center">
          <p class="text-gray-600 p-2">
            <span class="font-semibold">Company:</span> ${user.company}
          </p>
          <p class="text-gray-600 p-2">
            <span class="font-semibold">Location:</span> ${user.location}
          </p>
          <p class="text-gray-600 p-2">
            <span class="font-semibold">Email:</span> ${user.email}
          </p>
          <p class="text-gray-600 p-2">
            <span class="font-semibold">Member Since:</span> ${user.created_at}
          </p>
        </div>
      </div>
    </div>
  </div>
    <div class="mt-6">
             <p class="font-semibold text-gray-800 text-3xl">Latest Repos</p>
             <div id="repos" class="mt-4">
                   <!-- Repositories will be dynamically populated here -->
             </div>
    </div>
  </div>

      `);
    });
  });
});
