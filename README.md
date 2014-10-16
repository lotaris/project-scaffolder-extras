# project-scaffolder-extras

> Additional filters and tags for [`Project Scaffolder`][project-scaffolder]

**[Installation](#installation) &mdash; [Documentation](#documentation) &mdash; [Contributing](#contributing) &mdash; [License](#license)**


<a name="installation"></a>
## Installation

Go to the `Project Scaffolder` [repostitory][project-scaffolder] to install it.

Run the following command inside your template project.

```
npm install --save project-scaffolder-extras
```
<a name="documentation"></a>
## Documentation

To add those extra `filters` and `tags` just update your `scaff.yml` like below:

```yml
prompt:
  properties:
    propertyName:
      message: Somme message
      required: true
      default: true

extras:
  - project-scaffolder-extras

```

## Contributing

* [Fork](https://help.github.com/articles/fork-a-repo)
* Create a topic branch - `git checkout -b feature`
* Push to your branch - `git push origin feature`
* Create a [pull request](http://help.github.com/pull-requests/) from your branch

Please add a changelog entry with your name for new features and bug fixes.

## License

Project Scaffolder Extras is licensed under the [MIT License](http://opensource.org/licenses/MIT).
See [LICENSE.txt](LICENSE.txt) for the full text.

[project-scaffolder]: https://github.com/lotaris/project-scaffolder
