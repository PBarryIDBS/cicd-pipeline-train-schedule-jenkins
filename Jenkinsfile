pipeline {
	agent any
	stages {
		stage('Build') {
			steps {
				echo "Running build automation"
				sh './gradlew build --no-daemon'
				archiveArtifact artifactsL 'dist/trainSchedule.zip'
				}
			}
		stage('DeployToStaging'){
			when {
				branch 'master'
				}
				steps {
					withCredentials([usernamePassword(credentialsId: 'webserver_login', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]){
						sshPublisher{
							failOnError: true,
							continueOnError: false,
							publishers: [
								sshPublisherDesc(
									configName: 'STAGING',
									sshCredentials: [
										username: "$USERNAME",
										encryptedPassphrase: "$USERPASS"
									],
									transfers: [
										sshTransfer(
											sourceFiles: 'dist/trainschedule.zip',
											removePrefix: 'dist/',
											remoteDirectory: '/tmp',
											execCommand: 'sudo /usr/bin/systemctl stop train-schedule && rm -rf /opt/train-schedule/* && unzip /tmp/trainSchedule.zip -d /opt/train-schedule && /usr/bin/systemctl start train-schedule'
										)
									]
								)
							]
						)
					}
				}
			}
			stage('DeployToProduction'){
			when {
				branch 'master'
				}
				steps {
					input 'Does the staging environment look ok?'
					milestone(1)
					withCredentials([usernamePassword(credentialsId: 'webserver_login', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]){
						sshPublisher{
							failOnError: true,
							continueOnError: false,
							publishers: [
								sshPublisherDesc(
									configName: 'STAGING',
									sshCredentials: [
										username: "$USERNAME",
										encryptedPassphrase: "$USERPASS"
									],
									transfers: [
										sshTransfer(
											sourceFiles: 'dist/trainschedule.zip',
											removePrefix: 'dist/',
											remoteDirectory: '/tmp',
											execCommand: 'sudo /usr/bin/systemctl stop train-schedule && rm -rf /opt/train-schedule/* && unzip /tmp/trainSchedule.zip -d /opt/train-schedule && /usr/bin/systemctl start train-schedule'
										)
									]
								)
							]
						)
					}
				}
			}
			
		}
	}