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
                        'region': 'us-east-1'
                    }
                },
                'files': { 'dist/deploy/environments/endeavour.lam.json': ['deploy/lambda.json'] }
            },
            'atlantis': {
                'options': {
                    'data': {
                        'region': 'us-west-2'
                    }
                },
                'files': { 'dist/deploy/environments/atlantis.lam.json': ['deploy/lambda.json'] }
            },
            'discovery': {
                'options': {
                    'data': {
                        'region': 'us-west-1'
                    }
                },
                'files': { 'dist/deploy/environments/discovery.lam.json': ['deploy/lambda.json'] }
            },
            'columbia': {
                'options': {
                    'data': {
                        'region': 'eu-west-1'
                    }
                },
                'files': { 'dist/deploy/environments/columbia.lam.json': ['deploy/lambda.json'] }
            },
            'challenger': {
                'options': {
                    'data': {
                        'region': 'eu-west-1'
                    }
                },
                'files': { 'dist/deploy/environments/challenger.lam.json': ['deploy/lambda.json'] }
            },
            'stage': {
                'options': {
                    'data': {
                        'region': 'us-east-1'
                    }
                },
                'files': { 'dist/deploy/environments/stage.lam.json': ['deploy/lambda.json'] }
            },
            'prod': {
                'options': {
                    'data': {
                        'region': 'us-east-1'
                    }
                },
                'files': { 'dist/deploy/environments/prod.lam.json': ['deploy/lambda.json'] }
            },
            'prod-west': {
                'options': {
                    'data': {
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
            'main': {
                'options': { 'archive': 'dist/lambda.zip' },
                'files': [
                    {
                        'src': 'index.py',
                        'cwd': 'src/',
                        'expand': true
                    },
                    {
                        'src': 'config.json',
                        'cwd': 'src/',
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