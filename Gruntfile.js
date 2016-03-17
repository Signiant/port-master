module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.initConfig({
        template: {
            'endeavour': {
                'options': {
                    'data': {
                        'archive': 'endeavour.zip',
                        'region': 'us-east-1'
                    }
                },
                'files': { 'dist/deploy/environments/endeavour.lam.json': ['deploy/lambda.json'] }
            },
            'atlantis': {
                'options': {
                    'data': {
                        'archive': 'atlantis.zip',
                        'region': 'us-west-2'
                    }
                },
                'files': { 'dist/deploy/environments/atlantis.lam.json': ['deploy/lambda.json'] }
            },
            'discovery': {
                'options': {
                    'data': {
                        'archive': 'discovery.zip',
                        'region': 'us-west-1'
                    }
                },
                'files': { 'dist/deploy/environments/discovery.lam.json': ['deploy/lambda.json'] }
            },
            'columbia': {
                'options': {
                    'data': {
                        'archive': 'columbia.zip',
                        'region': 'eu-west-1'
                    }
                },
                'files': { 'dist/deploy/environments/columbia.lam.json': ['deploy/lambda.json'] }
            },
            'challenger': {
                'options': {
                    'data': {
                        'archive': 'challenger.zip',
                        'region': 'eu-west-1'
                    }
                },
                'files': { 'dist/deploy/environments/challenger.lam.json': ['deploy/lambda.json'] }
            },
            'stage': {
                'options': {
                    'data': {
                        'archive': 'stage.zip',
                        'region': 'us-east-1'
                    }
                },
                'files': { 'dist/deploy/environments/stage.lam.json': ['deploy/lambda.json'] }
            },
            'prod': {
                'options': {
                    'data': {
                        'archive': 'prod.zip',
                        'region': 'us-east-1'
                    }
                },
                'files': { 'dist/deploy/environments/prod.lam.json': ['deploy/lambda.json'] }
            },
            'prod-west': {
                'options': {
                    'data': {
                        'archive': 'prod-west.zip',
                        'region': 'us-west-2'
                    }
                },
                'files': { 'dist/deploy/environments/prod-west.lam.json': ['deploy/lambda.json'] }
            }
        },
        copy: {
            'main': {
                'files': [
                    {
                        'expand': true,
                        'cwd': 'deploy/',
                        'src': ['policy.lam.json'],
                        'dest': 'dist/deploy/',
                        'filter': 'isFile'
                    },
                    {
                        'cwd': 'deploy/',
                        'src': ['events/*'],
                        'dest': 'dist/deploy/'
                    }
                ]
            }
        },
        compress: {
            'endeavour': {
                'options': { 'archive': 'dist/endeavour.zip' },
                'files': [
                    {
                        'src': 'index.py',
                        'cwd': 'src/',
                        'expand': true
                    },
                    {
                        'src': 'config.json',
                        'cwd': 'src/config/endeavour/',
                        'expand': true
                    }
                ]
            },
            'atlantis': {
                'options': { 'archive': 'dist/atlantis.zip' },
                'files': [
                    {
                        'src': 'index.py',
                        'cwd': 'src/',
                        'expand': true
                    },
                    {
                        'src': 'config.json',
                        'cwd': 'src/config/atlantis/',
                        'expand': true
                    }
                ]
            },
            'discovery': {
                'options': { 'archive': 'dist/discovery.zip' },
                'files': [
                    {
                        'src': 'index.py',
                        'cwd': 'src/',
                        'expand': true
                    },
                    {
                        'src': 'config.json',
                        'cwd': 'src/config/discovery/',
                        'expand': true
                    }
                ]
            },
            'columbia': {
                'options': { 'archive': 'dist/columbia.zip' },
                'files': [
                    {
                        'src': 'index.py',
                        'cwd': 'src/',
                        'expand': true
                    },
                    {
                        'src': 'config.json',
                        'cwd': 'src/config/columbia/',
                        'expand': true
                    }
                ]
            },
            'challenger': {
                'options': { 'archive': 'dist/challenger.zip' },
                'files': [
                    {
                        'src': 'index.py',
                        'cwd': 'src/',
                        'expand': true
                    },
                    {
                        'src': 'config.json',
                        'cwd': 'src/config/challenger/',
                        'expand': true
                    }
                ]
            },
            'stage': {
                'options': { 'archive': 'dist/stage.zip' },
                'files': [
                    {
                        'src': 'index.py',
                        'cwd': 'src/',
                        'expand': true
                    },
                    {
                        'src': 'config.json',
                        'cwd': 'src/config/stage/',
                        'expand': true
                    }
                ]
            },
            'prod': {
                'options': { 'archive': 'dist/prod.zip' },
                'files': [
                    {
                        'src': 'index.py',
                        'cwd': 'src/',
                        'expand': true
                    },
                    {
                        'src': 'config.json',
                        'cwd': 'src/config/prod/',
                        'expand': true
                    }
                ]
            },
            'prod-west': {
                'options': { 'archive': 'dist/prod-west.zip' },
                'files': [
                    {
                        'src': 'index.py',
                        'cwd': 'src/',
                        'expand': true
                    },
                    {
                        'src': 'config.json',
                        'cwd': 'src/config/prod-west/',
                        'expand': true
                    }
                ]
            }
        }
    });
    grunt.registerTask('default', [
        'compress',
        'copy',
        'template'
    ]);
};