pipeline {
    agent any

    tools {
        // Jenkins -> Manage Jenkins -> Tools
        // Configure a NodeJS installation with the name: NodeJS
        nodejs 'NodeJS'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
    }

    stages {

        // ==========================================
        // CHECKOUT
        // ==========================================
        stage('Checkout') {
            steps {
                echo "=========================================="
                echo "Building Branch: ${env.BRANCH_NAME}"
                echo "Commit: ${env.GIT_COMMIT ?: 'latest'}"
                echo "Running on macOS"
                echo "=========================================="

                checkout scm
            }
        }

        // ==========================================
        // BACKEND
        // Runs on backend and master branches
        // ==========================================
        stage('Backend - Install Dependencies') {
            when {
                anyOf {
                    branch 'backend'
                    branch 'master'
                }
            }

            steps {
                dir('backend') {
                    echo '📦 [Backend] Installing dependencies...'

                    sh '''
                        echo "Node version:"
                        node --version

                        echo "NPM version:"
                        npm --version

                        if [ -f package-lock.json ]; then
                            npm ci
                        else
                            npm install
                        fi
                    '''
                }
            }
        }

        stage('Backend - Tests') {
            when {
                anyOf {
                    branch 'backend'
                    branch 'master'
                }
            }

            steps {
                dir('backend') {
                    echo '🧪 [Backend] Running tests...'

                    sh '''
                        if npm test -- --passWithNoTests; then
                            echo "✅ Backend tests passed"
                        else
                            echo "⚠️ Backend test command failed"
                            exit 1
                        fi
                    '''
                }
            }
        }

        // ==========================================
        // FRONTEND
        // Runs on frontend and master branches
        // ==========================================
        stage('Frontend - Install Dependencies') {
            when {
                anyOf {
                    branch 'frontend'
                    branch 'master'
                }
            }

            steps {
                dir('frontend') {
                    echo '📦 [Frontend] Installing dependencies...'

                    sh '''
                        echo "Node version:"
                        node --version

                        echo "NPM version:"
                        npm --version

                        if [ -f package-lock.json ]; then
                            npm ci
                        else
                            npm install
                        fi
                    '''
                }
            }
        }

        stage('Frontend - Lint') {
            when {
                anyOf {
                    branch 'frontend'
                    branch 'master'
                }
            }

            steps {
                dir('frontend') {
                    echo '🔍 [Frontend] Running ESLint...'

                    sh '''
                        npm run lint
                    '''
                }
            }
        }

        stage('Frontend - Production Build') {
            when {
                anyOf {
                    branch 'frontend'
                    branch 'master'
                }
            }

            steps {
                dir('frontend') {
                    echo '🏗️ [Frontend] Building Vite application...'

                    sh '''
                        npm run build
                    '''

                    echo '✅ Frontend production build completed'
                }
            }
        }

        // ==========================================
        // MASTER
        // ==========================================
        stage('Master - Build & Verify All') {
            when {
                branch 'master'
            }

            steps {
                echo '=========================================='
                echo '🚀 MASTER BRANCH VERIFICATION'
                echo '=========================================='
                echo '✅ Frontend verified'
                echo '✅ Backend verified'
                echo '✅ All checks passed'
                echo '=========================================='
            }
        }
    }

    // ==========================================
    // POST BUILD
    // ==========================================
    post {

        always {
            echo "Finished pipeline run for ${env.BRANCH_NAME}"

            // Jenkins Workspace Cleanup Plugin
            cleanWs(
                deleteDirs: true,
                notFailBuild: true
            )
        }

        success {
            echo "✅ Pipeline Succeeded for branch: ${env.BRANCH_NAME}"
        }

        failure {
            echo "❌ Pipeline Failed on branch: ${env.BRANCH_NAME}"
            echo "Inspect the Jenkins console output for details."
        }

        unstable {
            echo "⚠️ Pipeline completed with unstable status."
        }
    }
}